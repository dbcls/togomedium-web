import { createRouter, ToOptions } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen.ts";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({ routeTree });
export type LinkTo = ToOptions["to"];
