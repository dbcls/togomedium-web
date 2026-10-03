import { muiTheme } from "%stanza/styles/muiTheme";
import { useTheme } from "@mui/material/styles";
import { configureStore } from "@reduxjs/toolkit";
import { useQueryClient } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { atom, useAtom } from "jotai";
import { useEffect, useState, type ComponentProps } from "react";
import { useStore } from "react-redux";
import { afterEach, describe, expect, it, vi } from "vitest";
import { StoryProvider } from "./StoryProvider";

afterEach(cleanup);

describe("StoryProvider", () => {
  it.each([
    ["without optional providers", {}],
    ["with MUI", { mui: true }],
    ["with Query and MUI", { reactQuery: true, mui: true }],
    [
      "with all providers",
      {
        jotai: true,
        reactQuery: true,
        mui: true,
        redux: configureStore({ reducer: (state = 0) => state }),
      },
    ],
  ] satisfies [string, Omit<ComponentProps<typeof StoryProvider>, "children">][])(
    "preserves child state, DOM and effects on parent render %s",
    (_, props) => {
      const mount = vi.fn();
      const unmount = vi.fn();
      const Child = () => {
        const [count, setCount] = useState(0);
        useEffect(() => {
          mount();
          return unmount;
        }, []);
        return <button onClick={() => setCount(count + 1)}>{count}</button>;
      };
      const { rerender } = render(
        <StoryProvider {...props}>
          <Child />
        </StoryProvider>,
      );
      const button = screen.getByRole("button", { name: "0" });
      fireEvent.click(button);
      rerender(
        <StoryProvider {...props}>
          <Child />
        </StoryProvider>,
      );
      expect(screen.getByRole("button", { name: "1" })).toBe(button);
      expect(mount).toHaveBeenCalledTimes(1);
      expect(unmount).not.toHaveBeenCalled();
    },
  );

  it("retains an explicit Jotai store across parent renders and isolates provider instances", () => {
    const countAtom = atom(0);
    const Child = ({ label }: { label: string }) => {
      const [count, setCount] = useAtom(countAtom);
      return (
        <button onClick={() => setCount(count + 1)}>
          {label}: {count}
        </button>
      );
    };
    const { rerender } = render(
      <>
        <StoryProvider jotai>
          <Child label="first" />
        </StoryProvider>
        <StoryProvider jotai>
          <Child label="second" />
        </StoryProvider>
      </>,
    );
    fireEvent.click(screen.getByRole("button", { name: "first: 0" }));
    rerender(
      <>
        <StoryProvider jotai>
          <Child label="first" />
        </StoryProvider>
        <StoryProvider jotai>
          <Child label="second" />
        </StoryProvider>
      </>,
    );
    expect(screen.getByRole("button", { name: "first: 1" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "second: 0" })).toBeTruthy();
  });

  it("keeps the default Jotai store shared when jotai is omitted", () => {
    const countAtom = atom(0);
    const Child = ({ label }: { label: string }) => {
      const [count, setCount] = useAtom(countAtom);
      return (
        <button onClick={() => setCount(count + 1)}>
          {label}: {count}
        </button>
      );
    };
    render(
      <>
        <StoryProvider>
          <Child label="first" />
        </StoryProvider>
        <StoryProvider>
          <Child label="second" />
        </StoryProvider>
      </>,
    );
    fireEvent.click(screen.getByRole("button", { name: "first: 0" }));
    expect(screen.getByRole("button", { name: "second: 1" })).toBeTruthy();
  });

  it("keeps the shared QueryClient, supplied Redux store and MUI theme", () => {
    const store = configureStore({ reducer: (state = 0) => state });
    const clients: ReturnType<typeof useQueryClient>[] = [];
    const Child = () => {
      clients.push(useQueryClient());
      expect(useStore()).toBe(store);
      expect(useTheme()).toMatchObject(muiTheme);
      return null;
    };
    const { unmount } = render(
      <StoryProvider reactQuery redux={store} mui>
        <Child />
      </StoryProvider>,
    );
    unmount();
    render(
      <StoryProvider reactQuery redux={store} mui>
        <Child />
      </StoryProvider>,
    );
    expect(clients).toHaveLength(2);
    expect(clients[0]).toBe(clients[1]);
  });
});
