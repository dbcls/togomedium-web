import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { useHostType } from "@/hooks/useHostType.ts";

export const RouterDevToolsWrapper = () => {
  const { hostType } = useHostType();
  return hostType !== "production" && <TanStackRouterDevtools />;
};
