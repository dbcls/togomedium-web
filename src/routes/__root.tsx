import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { GlobalNavigation } from "../components/organisms/GlobalNavigation.tsx";
import { GlobalWrapper } from "../components/wrappers/GlobalWrapper.tsx";
import "../index.css";

export const Route = createRootRoute({
  component: () => (
    <GlobalWrapper>
      <GlobalNavigation />
      <ScrollRestoration />
      <Outlet />
      <TanStackRouterDevtools />
    </GlobalWrapper>
  ),
});
