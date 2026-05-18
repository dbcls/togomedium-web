import { MediumInfo } from "%stanza/stanzas/gmdb-medium-builder/components/MediumInfo";
import { DocumentActions } from "%stanza/stanzas/gmdb-medium-builder/state/slices/document";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it, vi } from "vitest";

const originalCreateObjectURLDescriptor = Object.getOwnPropertyDescriptor(URL, "createObjectURL");
const originalRevokeObjectURLDescriptor = Object.getOwnPropertyDescriptor(URL, "revokeObjectURL");

describe("MediumInfo JSON export", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    restoreUrlDownloadApi();
  });

  it("connects Save as .json to draft download and success feedback", () => {
    const store = createThunkTestStore();
    const downloadApi = installDownloadApiMock();
    const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});

    render(
      <Provider store={store}>
        <MediumInfo />
      </Provider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Save as .json" }));

    expect(downloadApi.createObjectURL).toHaveBeenCalledOnce();
    expect(click).toHaveBeenCalledOnce();
    expect(store.getState().feedback).toMatchObject({
      open: true,
      severity: "success",
      message: expect.stringMatching(/^Saved Test-medium-\d{4}-\d{2}-\d{2}\.json\.$/u),
    });
  });

  it("uses the fallback filename for an empty title", () => {
    const store = createThunkTestStore();
    store.dispatch(DocumentActions.setTitle(""));
    const downloadApi = installDownloadApiMock();
    const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});

    render(
      <Provider store={store}>
        <MediumInfo />
      </Provider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Save as .json" }));

    const anchor = click.mock.contexts[0] as HTMLAnchorElement;

    expect(downloadApi.createObjectURL).toHaveBeenCalledOnce();
    expect(anchor.download).toMatch(/^medium-builder-draft-\d{4}-\d{2}-\d{2}\.json$/u);
  });

  it("shows error feedback when browser download fails", () => {
    const store = createThunkTestStore();
    const createObjectURL = vi.fn(() => {
      throw new Error("Download blocked.");
    });
    installDownloadApiMock({ createObjectURL });

    render(
      <Provider store={store}>
        <MediumInfo />
      </Provider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Save as .json" }));

    expect(store.getState().feedback).toMatchObject({
      open: true,
      severity: "error",
      message: "Export failed.",
      detail: "Download blocked.",
    });
  });
});

const installDownloadApiMock = ({
  createObjectURL = vi.fn(() => "blob:medium-builder-draft"),
  revokeObjectURL = vi.fn(),
}: {
  createObjectURL?: (object: Blob | MediaSource) => string;
  revokeObjectURL?: (url: string) => void;
} = {}) => {
  Object.defineProperty(URL, "createObjectURL", {
    configurable: true,
    value: createObjectURL,
  });
  Object.defineProperty(URL, "revokeObjectURL", {
    configurable: true,
    value: revokeObjectURL,
  });

  return { createObjectURL, revokeObjectURL };
};

const restoreUrlDownloadApi = () => {
  if (originalCreateObjectURLDescriptor) {
    Object.defineProperty(URL, "createObjectURL", originalCreateObjectURLDescriptor);
  } else {
    delete (URL as Partial<typeof URL>).createObjectURL;
  }

  if (originalRevokeObjectURLDescriptor) {
    Object.defineProperty(URL, "revokeObjectURL", originalRevokeObjectURLDescriptor);
  } else {
    delete (URL as Partial<typeof URL>).revokeObjectURL;
  }
};
