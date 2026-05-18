import { MediumBuilderImportDialog } from "%stanza/stanzas/gmdb-medium-builder/components/MediumBuilderImportDialog";
import { MediumInfo } from "%stanza/stanzas/gmdb-medium-builder/components/MediumInfo";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("MediumBuilderImportDialog", () => {
  afterEach(() => {
    cleanup();
  });

  it("opens from MediumInfo and closes from the dialog", async () => {
    const store = createThunkTestStore();

    render(
      <Provider store={store}>
        <MediumInfo />
      </Provider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Upload .json" }));

    expect(screen.queryByRole("dialog", { name: "Upload .json" })).not.toBeNull();
    expect(
      screen.queryByText("Importing a JSON file will replace the current medium builder contents."),
    ).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Upload .json" })).toBeNull();
    });
  });

  it("selects one file from the file input and shows its name without content preview", () => {
    const onFileSelect = vi.fn();
    const file = new File(['{"title":"preview should stay hidden"}'], "single-medium.json", {
      type: "application/json",
    });
    const { rerender } = render(
      <MediumBuilderImportDialog
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
      <MediumBuilderImportDialog
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
      <MediumBuilderImportDialog
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
    const firstFile = new File(["{}"], "first.json", { type: "application/json" });
    const secondFile = new File(["{}"], "second.json", { type: "application/json" });

    render(
      <MediumBuilderImportDialog
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
        files: [firstFile, secondFile],
      },
    });

    expect(onFileSelect).toHaveBeenCalledWith(null);
    expect(
      screen.queryByText("Select a single JSON file. Multiple files cannot be imported at once."),
    ).not.toBeNull();
  });
});
