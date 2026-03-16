import { createRootRoute, Outlet } from "@tanstack/react-router";

import { GlobalNavigation } from "@/components/organisms/GlobalNavigation.tsx";
import { GlobalWrapper } from "@/components/wrappers/GlobalWrapper.tsx";

import "../index.css";
import { RouterDevToolsWrapper } from "@/components/wrappers/RouterDevToolsWrapper.tsx";

export const Route = createRootRoute({
  component: () => {
    return (
      <GlobalWrapper>
        <GlobalNavigation />
        <Outlet />
        <RouterDevToolsWrapper />
      </GlobalWrapper>
    );
  },
});
