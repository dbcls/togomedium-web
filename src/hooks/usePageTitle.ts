import { useDocumentTitle } from "usehooks-ts";

const name = "TogoMedium";
const makePageTitle = (str?: string) => (str ? `${str} | ${name}` : name);

export const usePageTitle = (title: string) => {
  useDocumentTitle(makePageTitle(title));
};
