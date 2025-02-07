import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { FC } from "react";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();
const originalReplaceState = window.history.replaceState;
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});
window.history.replaceState = originalReplaceState;

// router.subscribe("onResolved", (e) => {
//   console.log({ e });
// });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const App: FC = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
};
