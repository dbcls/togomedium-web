import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ListPageSizeSelect, type ListPageSize } from "./ListPageSizeSelect";

afterEach(cleanup);

describe("ListPageSizeSelect", () => {
  it("offers only 20, 50, and 100 and emits a numeric page size", () => {
    const change = vi.fn();
    const Example = () => {
      const [value, setValue] = useState<ListPageSize>(20);
      return (
        <ListPageSizeSelect
          value={value}
          onChange={(next) => {
            setValue(next);
            change(next);
          }}
        />
      );
    };
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "20 items Items per page" }));
    expect(screen.getAllByRole("option").map((option) => option.textContent)).toEqual([
      "20 items",
      "50 items",
      "100 items",
    ]);
    fireEvent.click(screen.getByRole("option", { name: "100 items" }));
    expect(change).toHaveBeenCalledExactlyOnceWith(100);
    expect(screen.getByRole("button", { name: "100 items Items per page" })).toBeTruthy();
  });
});
