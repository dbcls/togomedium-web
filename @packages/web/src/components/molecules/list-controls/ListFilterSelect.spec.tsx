import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ListFilterSelect } from "./ListFilterSelect";

afterEach(cleanup);

const options = [
  { id: "parent", label: "Nutrient source", count: 120 },
  { id: "child", label: "Carbon source", count: 0, depth: 1 },
];

describe("ListFilterSelect", () => {
  it("allows a zero-count option and clearing it back to Any", () => {
    const change = vi.fn();
    const Example = () => {
      const [value, setValue] = useState<string | null>(null);
      return (
        <ListFilterSelect
          label="Role"
          value={value}
          options={options}
          onChange={(next) => {
            setValue(next);
            change(next);
          }}
        />
      );
    };
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Any Role" }));
    fireEvent.click(screen.getByRole("option", { name: "Carbon source, level 2, 0 results" }));
    expect(change).toHaveBeenCalledWith("child");
    fireEvent.click(screen.getByRole("button", { name: "Carbon source Role" }));
    fireEvent.click(screen.getByRole("option", { name: "Any" }));
    expect(change).toHaveBeenLastCalledWith(null);
  });

  it.each(["loading", "error"] as const)(
    "does not expose stale counts while %s",
    (countsStatus) => {
      render(
        <ListFilterSelect
          label="Role"
          value={null}
          options={options}
          countsStatus={countsStatus}
          onChange={() => {}}
        />,
      );
      expect(screen.getByRole("status").textContent).toContain(
        countsStatus === "loading" ? "Loading counts" : "Counts unavailable",
      );
      fireEvent.click(screen.getByRole("button", { name: "Any Role" }));
      expect(screen.queryByRole("option", { name: "Nutrient source, 120 results" })).toBeNull();
      expect(
        screen.getByRole("option", {
          name: `Nutrient source, count ${countsStatus === "loading" ? "loading" : "unavailable"}`,
        }),
      ).toBeTruthy();
    },
  );

  it("keeps Any available without options", () => {
    render(<ListFilterSelect label="Role" value={null} options={[]} onChange={() => {}} />);
    expect(screen.getByRole("status").textContent).toBe("No filter options.");
    fireEvent.click(screen.getByRole("button", { name: "Any Role" }));
    expect(screen.getAllByRole("option")).toHaveLength(1);
  });
});
