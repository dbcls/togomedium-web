import {
  BehaviorSubject,
  concatMap,
  delay,
  filter,
  first,
  from,
  fromEvent,
  merge,
  switchMap,
  tap,
} from "rxjs";
import { addClassIf, findByDataSet, findMultipleByDataSet, setStyle } from "yohak-tools";

export const initHeader = () => {
  const currentFocus$ = new BehaviorSubject<string | null>(null);
  const header = findByDataSet("globalHeader")!;

  const buttons = findMultipleByDataSet(null, "navTarget", header);
  buttons.forEach((button) => {
    const key = button.dataset.navTarget!;
    const nav = findByDataSet(key, "navKey")!;

    fromEvent(button, "mouseover")
      .pipe(
        delay(100),
        concatMap(() => currentFocus$.pipe(first())),
        filter((r) => r !== key),
        filter(() => button.matches(":hover"))
      )
      .subscribe(() => currentFocus$.next(key));
    merge(fromEvent(button, "mouseleave"), fromEvent(nav, "mouseleave"))
      .pipe(
        delay(500),
        concatMap(() => currentFocus$.pipe(first())),
        filter((r) => r === key),
        filter(() => !(button.matches(":hover") || nav.matches(":hover")))
      )
      .subscribe(() => currentFocus$.next(null));

    currentFocus$.subscribe((r) => {
      setStyle(nav, { left: button.getBoundingClientRect().left });
      addClassIf(nav, r === key, "active");
    });
  });
};
