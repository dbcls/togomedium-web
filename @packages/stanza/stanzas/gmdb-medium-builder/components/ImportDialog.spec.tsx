import { ImportDialog } from "%stanza/stanzas/gmdb-medium-builder/components/ImportDialog";
import { MediumInfo } from "%stanza/stanzas/gmdb-medium-builder/components/MediumInfo";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { createStanzaMuiTheme } from "%stanza/styles/muiTheme";
import { ThemeProvider } from "@mui/material/styles";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("ImportDialog", () => {
  let opener: HTMLButtonElement;

  beforeEach(() => {
    // Model the focused control that opens a dialog so MUI can restore focus on close.
    opener = document.createElement("button");
    document.body.append(opener);
    opener.focus();
  });
  afterEach(() => {
    cleanup();
    opener.remove();
  });

  it("opens from MediumInfo and closes from the dialog", async () => {
    const store = createThunkTestStore();

    render(
      <Provider store={store}>
        <MediumInfo />
      </Provider>,
    );

    const uploadButton = screen.getByRole("button", { name: "Upload .json" });
    uploadButton.focus();
    fireEvent.click(uploadButton);

    expect(screen.queryByRole("dialog", { name: "Upload .json" })).not.toBeNull();
    expect(
      screen.queryByText("Importing a JSON file will replace the current medium builder contents."),
    ).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Upload .json" })).toBeNull();
      expect(document.activeElement).toBe(uploadButton);
    });
  });

  it("keeps the dialog inside the Stanza shadow root where Emotion styles are injected", () => {
    const host = document.createElement("div");
    document.body.append(host);
    const shadowRoot = host.attachShadow({ mode: "open" });
    const container = document.createElement("div");
    shadowRoot.append(container);

    const { unmount } = render(
      <ThemeProvider theme={createStanzaMuiTheme(container)}>
        <ImportDialog open={true} selectedFile={null} onClose={vi.fn()} onFileSelect={vi.fn()} />
      </ThemeProvider>,
      { container },
    );

    expect(shadowRoot.querySelector('[role="dialog"]')).not.toBeNull();
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();

    unmount();
    host.remove();
  });

  it("selects one file from the file input and shows its name without content preview", () => {
    const onFileSelect = vi.fn();
    const file = new File(['{"title":"preview should stay hidden"}'], "single-medium.json", {
      type: "application/json",
    });
    const { rerender } = render(
      <ImportDialog
        open={true}
        selectedFile={null}
        onClose={vi.fn()}
        onFileSelect={onFileSelect}
        onImport={vi.fn()}
      />,
    );

    const dropZone = screen.getByText("Drop a JSON file here").closest("label");
    expect(dropZone).not.toBeNull();

    const input = (dropZone as HTMLLabelElement).querySelector<HTMLInputElement>(
      'input[type="file"]',
    );
    expect(input).not.toBeNull();

    fireEvent.change(input as HTMLInputElement, { target: { files: [file] } });

    expect(onFileSelect).toHaveBeenCalledWith(file);

    rerender(
      <ImportDialog
        open={true}
        selectedFile={file}
        onClose={vi.fn()}
        onFileSelect={onFileSelect}
        onImport={vi.fn()}
      />,
    );

    expect(screen.queryByText("single-medium.json")).not.toBeNull();
    expect(screen.queryByText(/preview should stay hidden/u)).toBeNull();
  });

  it("selects one file from drag and drop", () => {
    const onFileSelect = vi.fn();
    const file = new File(["{}"], "dropped-medium.json", {
      type: "application/json",
    });

    render(
      <ImportDialog
        open={true}
        selectedFile={null}
        onClose={vi.fn()}
        onFileSelect={onFileSelect}
        onImport={vi.fn()}
      />,
    );

    const dropZone = screen.getByText("Drop a JSON file here").closest("label");
    expect(dropZone).not.toBeNull();

    fireEvent.drop(dropZone as HTMLLabelElement, {
      dataTransfer: {
        files: [file],
      },
    });

    expect(onFileSelect).toHaveBeenCalledWith(file);
  });

  it("rejects multiple files with a visible message", () => {
    const onFileSelect = vi.fn();
    const onImport = vi.fn();
    const firstFile = new File(["{}"], "first.json", { type: "application/json" });
    const secondFile = new File(["{}"], "second.json", { type: "application/json" });

    render(
      <ImportDialog
        open={true}
        selectedFile={null}
        onClose={vi.fn()}
        onFileSelect={onFileSelect}
        onImport={onImport}
      />,
    );

    const dropZone = screen.getByText("Drop a JSON file here").closest("label");
    expect(dropZone).not.toBeNull();

    fireEvent.drop(dropZone as HTMLLabelElement, {
      dataTransfer: {
        files: [firstFile, secondFile],
      },
    });

    expect(onFileSelect).toHaveBeenCalledWith(null);
    expect(
      screen.queryByText("Select a single JSON file. Multiple files cannot be imported at once."),
    ).not.toBeNull();
    expect((screen.getByRole("button", { name: "Import" }) as HTMLButtonElement).disabled).toBe(
      true,
    );
    expect(onImport).not.toHaveBeenCalled();
  });
});
