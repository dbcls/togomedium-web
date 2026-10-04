import type { SearchComponentsListResponse } from "%api/searchComponentsList/definitions";
import { useLocation } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { StoryProvider } from "../../../../.storybook/StoryProvider";
import { ComponentCard } from "./ComponentCard";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
const component = {
  id: "GMO_000001",
  name: "Glucose",
  aliases: ["Dextrose"],
  matched_names: ["Glucose", "Dextrose", "グルコース", "グルコース"],
  medium_count: 0,
  roles: [],
  properties: [],
} satisfies SearchComponentsListResponse["contents"][number];
const Location = () => <output aria-label="Current path">{useLocation().pathname}</output>;

describe("ComponentCard", () => {
  it("links to the existing detail route without API requests", async () => {
    const network = vi.spyOn(globalThis, "fetch");
    render(
      <StoryProvider>
        <ComponentCard component={component} />
        <Location />
      </StoryProvider>,
    );
    const link = await screen.findByRole("link", { name: "Glucose (GMO_000001)" });
    expect(link.getAttribute("href")).toBe("/component/GMO_000001");
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(link.querySelector("a")).toBeNull();
    fireEvent.click(screen.getByText("Dextrose"));
    await screen.findByText("/component/GMO_000001");
    expect(network).not.toHaveBeenCalled();
  });

  it("preserves zero media and aliases without displaying matched names", async () => {
    render(
      <StoryProvider>
        <ComponentCard component={component} />
      </StoryProvider>,
    );
    await screen.findByRole("link", { name: "Glucose (GMO_000001)" });
    expect(screen.getByText("0").parentElement?.textContent).toBe("0 media");
    expect(screen.getAllByText("Dextrose")).toHaveLength(1);
    expect(screen.queryByText("グルコース")).toBeNull();
    expect(screen.queryByText("None recorded")).toBeNull();
  });
});
