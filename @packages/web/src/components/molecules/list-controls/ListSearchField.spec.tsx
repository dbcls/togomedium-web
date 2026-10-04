import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ListSearchField } from "./ListSearchField";

afterEach(cleanup);

describe("ListSearchField", () => {
  it("immediately submits an empty keyword only when the clear button is used", () => {
    const submit = vi.fn();
    const Example = () => {
      const [value, setValue] = useState("Glucose");
      return <ListSearchField value={value} onChange={setValue} onSubmit={submit} />;
    };
    render(<Example />);
    const input = screen.getByRole<HTMLInputElement>("searchbox");
    fireEvent.change(input, { target: { value: "" } });
    expect(submit).not.toHaveBeenCalled();
    fireEvent.change(input, { target: { value: "Sucrose" } });
    fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(submit).toHaveBeenCalledExactlyOnceWith("");
    expect(input.value).toBe("");
    expect(screen.queryByRole("button", { name: "Clear search" })).toBeNull();
  });
  it("keeps edits separate from submission and submits the current draft", () => {
    const submit = vi.fn();
    const Example = () => {
      const [value, setValue] = useState("Glucose");
      return <ListSearchField value={value} onChange={setValue} onSubmit={submit} />;
    };
    render(<Example />);
    fireEvent.change(screen.getByRole("searchbox", { name: "Name or GMO ID" }), {
      target: { value: "Sucrose" },
    });
    expect(submit).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(submit).toHaveBeenCalledExactlyOnceWith("Sucrose");
  });

  it("allows an empty search to clear the applied name filter", () => {
    const submit = vi.fn();
    render(<ListSearchField value="" onChange={() => {}} onSubmit={submit} />);
    fireEvent.submit(screen.getByRole("search", { name: "Name or GMO ID" }));
    expect(submit).toHaveBeenCalledExactlyOnceWith("");
  });

  it("prevents an IME confirmation Enter but permits an ordinary Enter", () => {
    render(<ListSearchField value="糖" onChange={() => {}} onSubmit={() => {}} />);
    const input = screen.getByRole("searchbox");
    expect(fireEvent.keyDown(input, { key: "Enter", isComposing: true })).toBe(false);
    expect(fireEvent.keyDown(input, { key: "Enter", keyCode: 229 })).toBe(false);
    expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(true);
  });

  it("blocks submission when disabled", () => {
    const submit = vi.fn();
    render(<ListSearchField value="Glucose" onChange={() => {}} onSubmit={submit} isDisabled />);
    fireEvent.submit(screen.getByRole("search"));
    expect(submit).not.toHaveBeenCalled();
    expect((screen.getByRole("searchbox") as HTMLInputElement).disabled).toBe(true);
  });
});
