import { NextUIProvider } from "@nextui-org/react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { FC } from "react";
import { routeTree } from "./routeTree.gen";

//

const router = createRouter({ routeTree });

export const App: FC = () => {
  return (
    <div>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </div>
  );
};
