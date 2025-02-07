import { createHistory, RouterHistory } from "@tanstack/react-router";

type SubscriberHistoryAction =
  | {
      type: HistoryAction;
    }
  | {
      type: "GO";
      index: number;
    };

export interface HistoryLocation extends ParsedPath {
  state: ParsedHistoryState;
}

export interface ParsedPath {}

export interface HistoryState {}

export type ParsedHistoryState = HistoryState & {
  key?: string;
  __TSR_index: number;
};

type ShouldAllowNavigation = any;

export type HistoryAction = "PUSH" | "REPLACE" | "FORWARD" | "BACK" | "GO";

export type BlockerFnArgs = {
  currentLocation: HistoryLocation;
  nextLocation: HistoryLocation;
  action: HistoryAction;
};

export type BlockerFn = (
  args: BlockerFnArgs
) => Promise<ShouldAllowNavigation> | ShouldAllowNavigation;

export type NavigationBlocker = {
  blockerFn: BlockerFn;
  enableBeforeUnload?: (() => boolean) | boolean;
};

const stateIndexKey = "__TSR_index";
const popStateEvent = "popstate";
const beforeUnloadEvent = "beforeunload";

function parseHref(href: string, state: ParsedHistoryState | undefined): HistoryLocation {
  const hashIndex = href.indexOf("#");
  const searchIndex = href.indexOf("?");

  return {
    href,
    pathname: href.substring(
      0,
      hashIndex > 0
        ? searchIndex > 0
          ? Math.min(hashIndex, searchIndex)
          : hashIndex
        : searchIndex > 0
          ? searchIndex
          : href.length
    ),
    hash: hashIndex > -1 ? href.substring(hashIndex) : "",
    search:
      searchIndex > -1 ? href.slice(searchIndex, hashIndex === -1 ? undefined : hashIndex) : "",
    state: state || { [stateIndexKey]: 0, key: createRandomKey() },
  };
}

function createRandomKey() {
  return (Math.random() + 1).toString(36).substring(7);
}

export function createCustomHistory(opts?: {
  parseLocation?: () => HistoryLocation;
  createHref?: (path: string) => string;
  window?: any;
}): RouterHistory {
  const win = opts?.window ?? (typeof document !== "undefined" ? window : (undefined as any));

  const originalPushState = win.history.pushState;
  const originalReplaceState = win.history.replaceState;

  let blockers: Array<NavigationBlocker> = [];
  const _getBlockers = () => blockers;
  const _setBlockers = (newBlockers: Array<NavigationBlocker>) => (blockers = newBlockers);

  const createHref = opts?.createHref ?? ((path) => path);
  const parseLocation =
    opts?.parseLocation ??
    (() =>
      parseHref(
        `${win.location.pathname}${win.location.search}${win.location.hash}`,
        win.history.state
      ));

  // Ensure there is always a key to start
  if (!win.history.state?.key) {
    win.history.replaceState(
      {
        [stateIndexKey]: 0,
        key: createRandomKey(),
      },
      ""
    );
  }

  let currentLocation = parseLocation();
  let rollbackLocation: HistoryLocation | undefined;

  let nextPopIsGo = false;
  let ignoreNextPop = false;
  let skipBlockerNextPop = false;
  const ignoreNextBeforeUnload = false;

  const getLocation = () => currentLocation;

  let next:
    | undefined
    | {
        // This is the latest location that we were attempting to push/replace
        href: string;
        // This is the latest state that we were attempting to push/replace
        state: any;
        // This is the latest type that we were attempting to push/replace
        isPush: boolean;
      };

  // We need to track the current scheduled update to prevent
  // multiple updates from being scheduled at the same time.
  let scheduled: Promise<void> | undefined;

  // This function flushes the next update to the browser history
  const flush = () => {
    if (!next) {
      return;
    }

    // We need to ignore any updates to the subscribers while we update the browser history
    history._ignoreSubscribers = true;

    // Update the browser history
    (next.isPush ? win.history.pushState : win.history.replaceState)(next.state, "", next.href);

    // Stop ignoring subscriber updates
    history._ignoreSubscribers = false;

    // Reset the nextIsPush flag and clear the scheduled update
    next = undefined;
    scheduled = undefined;
    rollbackLocation = undefined;
  };

  // This function queues up a call to update the browser history
  const queueHistoryAction = (type: "push" | "replace", destHref: string, state: any) => {
    const href = createHref(destHref);

    if (!scheduled) {
      rollbackLocation = currentLocation;
    }

    // Update the location in memory
    currentLocation = parseHref(destHref, state);

    // Keep track of the next location we need to flush to the URL
    next = {
      href,
      state,
      isPush: next?.isPush || type === "push",
    };

    if (!scheduled) {
      // Schedule an update to the browser history
      scheduled = Promise.resolve().then(() => flush());
    }
  };

  // NOTE: this function can probably be removed
  const onPushPop = (type: "PUSH" | "REPLACE") => {
    currentLocation = parseLocation();
    history.notify({ type });
  };

  const onPushPopEvent = async () => {
    if (ignoreNextPop) {
      ignoreNextPop = false;
      return;
    }

    const nextLocation = parseLocation();
    const delta = nextLocation.state[stateIndexKey] - currentLocation.state[stateIndexKey];
    const isForward = delta === 1;
    const isBack = delta === -1;
    const isGo = (!isForward && !isBack) || nextPopIsGo;
    nextPopIsGo = false;

    const action = isGo ? "GO" : isBack ? "BACK" : "FORWARD";
    const notify: SubscriberHistoryAction = isGo
      ? {
          type: "GO",
          index: delta,
        }
      : {
          type: isBack ? "BACK" : "FORWARD",
        };

    if (skipBlockerNextPop) {
      skipBlockerNextPop = false;
    } else {
      const blockers = _getBlockers();
      if (typeof document !== "undefined" && blockers.length) {
        for (const blocker of blockers) {
          const isBlocked = await blocker.blockerFn({
            currentLocation,
            nextLocation,
            action,
          });
          if (isBlocked) {
            ignoreNextPop = true;
            win.history.go(1);
            history.notify(notify);
            return;
          }
        }
      }
    }

    currentLocation = parseLocation();
    history.notify(notify);
  };

  const onBeforeUnload = (e: BeforeUnloadEvent) => {};

  const history = createHistory({
    getLocation,
    getLength: () => win.history.length,
    pushState: (href, state) => queueHistoryAction("push", href, state),
    replaceState: (href, state) => queueHistoryAction("replace", href, state),
    back: (_ignoreBlocker) => {},
    forward: (_ignoreBlocker) => {},
    go: (n) => {
      nextPopIsGo = true;
      win.history.go(n);
    },
    createHref: (href) => createHref(href),
    flush,
    destroy: () => {},
    onBlocked: () => {},
    getBlockers: _getBlockers,
    setBlockers: _setBlockers,
    notifyOnIndexChange: false,
  });

  win.addEventListener(beforeUnloadEvent, onBeforeUnload, { capture: true });
  win.addEventListener(popStateEvent, onPushPopEvent);

  win.history.pushState = function (...args: Array<any>) {
    const res = originalPushState.apply(win.history, args as any);
    if (!history._ignoreSubscribers) onPushPop("PUSH");
    return res;
  };

  // NOTE: remove replaceState for not to trigger events on HashChange
  win.history.replaceState = function (...args: Array<any>) {
    const res = originalReplaceState.apply(win.history, args as any);
    if (!history._ignoreSubscribers) onPushPop("REPLACE");
    return res;
  };

  return history;
}
