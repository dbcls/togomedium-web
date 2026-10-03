import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { createContext, useContext, useState, type ReactNode } from "react";
import { createCountFixtures, type StoryCounts } from "./fixtures";

export type StoryEnvironment = {
  initialPath?: string;
  counts?: StoryCounts;
};
const StoryContent = createContext<ReactNode>(null);

const StoryRoot = () => <>{useContext(StoryContent)}</>;

export const StoryProvider = ({
  children,
  initialPath = "/",
  counts,
}: StoryEnvironment & { children: ReactNode }) => {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    });
    createCountFixtures(counts).forEach(({ url, data }) => client.setQueryData([url], data));
    return client;
  });
  const [router] = useState(() => {
    const root = createRootRoute({ component: StoryRoot });
    const index = createRoute({ getParentRoute: () => root, path: "/", component: () => null });
    const destination = createRoute({
      getParentRoute: () => root,
      path: "$",
      component: () => null,
    });
    return createRouter({
      routeTree: root.addChildren([index, destination]),
      history: createMemoryHistory({ initialEntries: [initialPath] }),
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <StoryContent.Provider value={children}>
        <RouterProvider router={router} />
      </StoryContent.Provider>
    </QueryClientProvider>
  );
};
