import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  useLocation,
} from "@tanstack/react-router";
import { createContext, useContext, useState, type ReactNode } from "react";
import { createCountFixtures, type StoryCounts } from "./fixtures";

export type StoryEnvironment = {
  initialPath?: string;
  counts?: StoryCounts;
  showLocation?: boolean;
};
const StoryContent = createContext<ReactNode>(null);

const StoryRoot = () => <>{useContext(StoryContent)}</>;
const StoryLocation = () => {
  const location = useLocation();
  return (
    <output aria-label="Story location" className="mt-6 block border-t pt-2 text-sm text-gray-600">
      Story location: {location.href}
    </output>
  );
};

export const StoryProvider = ({
  children,
  initialPath = "/",
  counts,
  showLocation = false,
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
      <StoryContent.Provider
        value={
          <>
            {children}
            {showLocation && <StoryLocation />}
          </>
        }
      >
        <RouterProvider router={router} />
      </StoryContent.Provider>
    </QueryClientProvider>
  );
};
