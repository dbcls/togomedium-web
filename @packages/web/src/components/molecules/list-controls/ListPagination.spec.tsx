import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ListPagination } from "./ListPagination";

afterEach(cleanup);

describe("ListPagination", () => {
  it("navigates by numbered pages and preserves the final partial page", () => {
    const Example = () => {
      const [page, setPage] = useState(1);
      return <ListPagination page={page} totalItems={41} pageSize={20} onPageChange={setPage} />;
    };
    render(<Example />);
    expect((screen.getByRole("button", { name: "Previous" }) as HTMLButtonElement).disabled).toBe(
      true,
    );
    fireEvent.click(screen.getByRole("button", { name: "Page 3" }));
    expect(screen.getByRole("status").textContent).toBe("Page 3 of 3 · 41 results");
    expect(screen.getByRole("button", { name: "Page 3" }).getAttribute("aria-current")).toBe(
      "page",
    );
    expect((screen.getByRole("button", { name: "Next" }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    expect(screen.getByRole("status").textContent).toBe("Page 2 of 3 · 41 results");
  });

  it("has no selectable pages for zero results", () => {
    const change = vi.fn();
    render(<ListPagination page={1} totalItems={0} pageSize={20} onPageChange={change} />);
    expect(screen.getByRole("status").textContent).toBe("No results");
    expect(screen.queryByRole("button", { name: "Page 1" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(change).not.toHaveBeenCalled();
  });

  it("does not leave a single page or repeat the current page callback", () => {
    const change = vi.fn();
    render(<ListPagination page={1} totalItems={12} pageSize={20} onPageChange={change} />);
    fireEvent.click(screen.getByRole("button", { name: "Page 1" }));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(change).not.toHaveBeenCalled();
  });

  it("retains first and last page access without rendering every page", () => {
    const change = vi.fn();
    render(<ListPagination page={38} totalItems={1539} pageSize={20} onPageChange={change} />);
    expect(screen.getAllByRole("button").length).toBeLessThan(10);
    fireEvent.click(screen.getByRole("button", { name: "Page 77" }));
    expect(change).toHaveBeenCalledExactlyOnceWith(77);
  });

  it("blocks all page actions when disabled", () => {
    const change = vi.fn();
    render(
      <ListPagination page={2} totalItems={60} pageSize={20} onPageChange={change} isDisabled />,
    );
    screen.getAllByRole("button").forEach((button) => fireEvent.click(button));
    expect(change).not.toHaveBeenCalled();
  });
});
