import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ListSelect } from "./ListSelect";

afterEach(cleanup);

describe("ListSelect", () => {
  it("selects arbitrary caller options and emits their string IDs", () => {
    const change = vi.fn();
    const Example = () => {
      const [value, setValue] = useState("name");
      return (
        <ListSelect
          label="Sort by"
          value={value}
          options={[
            { id: "name", label: "Standard name" },
            { id: "medium-count-desc", label: "Medium count" },
          ]}
          onChange={(next) => {
            setValue(next);
            change(next);
          }}
        />
      );
    };
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Standard name Sort by" }));
    fireEvent.click(screen.getByRole("option", { name: "Medium count" }));
    expect(change).toHaveBeenCalledExactlyOnceWith("medium-count-desc");
    expect(screen.getByRole("button", { name: "Medium count Sort by" })).toBeTruthy();
  });

  it("leaves numeric page-size conversion to the caller", () => {
    const change = vi.fn();
    render(
      <ListSelect
        label="Items per page"
        value="20"
        options={[20, 50, 100].map((size) => ({ id: String(size), label: `${size} items` }))}
        onChange={(next) => change(Number(next))}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "20 items Items per page" }));
    expect(screen.getAllByRole("option").map((option) => option.textContent)).toEqual([
      "20 items",
      "50 items",
      "100 items",
    ]);
    fireEvent.click(screen.getByRole("option", { name: "100 items" }));
    expect(change).toHaveBeenCalledExactlyOnceWith(100);
  });
});
