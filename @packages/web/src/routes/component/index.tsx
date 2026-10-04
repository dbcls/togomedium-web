import { createFileRoute } from "@tanstack/react-router";
import { ComponentListPage } from "@/pages/ComponentListPage.tsx";
import {
  componentListSearchMiddleware,
  normalizeComponentListUrl,
  validateComponentListSearch,
} from "@/utils/componentListSearch";

export const Route = createFileRoute("/component/")({
  validateSearch: validateComponentListSearch,
  search: { middlewares: [componentListSearchMiddleware] },
  beforeLoad: normalizeComponentListUrl,
  component: () => <ComponentListPage />,
});
