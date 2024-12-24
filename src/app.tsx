import { FC } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import type { NavigateOptions, ToOptions } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

// TODO make an iterable variable of this type
type ExternalUrls = "https://dbcls.rois.ac.jp/contact-en.html";
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
declare module "@react-types/shared" {
  interface RouterConfig {
    href: ToOptions["to"] | ExternalUrls;
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

const router = createRouter({ routeTree });

export const App: FC = () => {
  return (
    <div>
      <NextUIProvider
        navigate={(to, options) => {
          if (to === "https://dbcls.rois.ac.jp/contact-en.html") {
            window.open(to, "_blank");
            return;
          }
          router.navigate({ to, ...(options ?? {}) });
        }}
        useHref={(to) => {
          if (to === "https://dbcls.rois.ac.jp/contact-en.html") {
            return to;
          }
          return router.buildLocation({ to }).href;
        }}
      >
        <RouterProvider router={router} />
      </NextUIProvider>
    </div>
  );
};
