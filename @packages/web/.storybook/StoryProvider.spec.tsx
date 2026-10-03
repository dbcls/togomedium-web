import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchData } from "./fixtureFetch";
import { createCountFixtures } from "./fixtures";
import { StoryProvider } from "./StoryProvider";

afterEach(cleanup);

const Probe = ({ name }: { name: string }) => {
  const [count, setCount] = useState(0);
  const client = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        setCount(count + 1);
        client.setQueryData(["probe"], name);
        void navigate({ to: "/search", search: { query: name } });
      }}
    >
      {name}: {count} {location.href} {String(client.getQueryData(["probe"]) ?? "empty")}
    </button>
  );
};

describe("Web StoryProvider", () => {
  it("preserves React, query and router state on rerender and isolates concurrent stories", async () => {
    const content = () => (
      <>
        <StoryProvider>
          <Probe name="first" />
        </StoryProvider>
        <StoryProvider>
          <Probe name="second" />
        </StoryProvider>
      </>
    );
    const { rerender } = render(content());
    const first = await screen.findByRole("button", { name: "first: 0 / empty" });
    fireEvent.click(first);
    await screen.findByRole("button", { name: "first: 1 /search?query=first first" });
    rerender(content());
    expect(screen.getByRole("button", { name: "first: 1 /search?query=first first" })).toBe(first);
    expect(screen.getByRole("button", { name: "second: 0 / empty" })).toBeTruthy();
  });

  it("resets state when the decorator story key changes", async () => {
    const { rerender } = render(
      <StoryProvider key="a">
        <Probe name="story" />
      </StoryProvider>,
    );
    fireEvent.click(await screen.findByRole("button", { name: "story: 0 / empty" }));
    await screen.findByRole("button", { name: "story: 1 /search?query=story story" });
    rerender(
      <StoryProvider key="b">
        <Probe name="story" />
      </StoryProvider>,
    );
    await screen.findByRole("button", { name: "story: 0 / empty" });
  });

  it("seeds independent fixture counts without calling the network", async () => {
    const network = vi.spyOn(globalThis, "fetch");
    const Count = () => {
      const client = useQueryClient();
      return (
        <span>{client.getQueryData<{ total: number }>([createCountFixtures()[0].url])?.total}</span>
      );
    };
    render(
      <>
        <StoryProvider counts={{ media: 17, strains: 18, components: 19 }}>
          <Count />
        </StoryProvider>
        <StoryProvider>
          <Count />
        </StoryProvider>
      </>,
    );
    await waitFor(() => expect(screen.getByText("17")).toBeTruthy());
    expect(screen.getByText("2400")).toBeTruthy();
    expect(network).not.toHaveBeenCalled();
    network.mockRestore();
  });

  it("returns cloned fixtures and rejects missing fixtures without a network fallback", async () => {
    const network = vi.spyOn(globalThis, "fetch");
    const url = createCountFixtures()[0].url;
    const first = await fetchData<{ total: number }>(url);
    first.total = 1;
    expect(await fetchData(url)).toMatchObject({ total: 2400 });
    await expect(fetchData("https://example.invalid/unregistered")).rejects.toThrow(
      "Missing Storybook API fixture",
    );
    expect(network).not.toHaveBeenCalled();
    network.mockRestore();
  });
});
