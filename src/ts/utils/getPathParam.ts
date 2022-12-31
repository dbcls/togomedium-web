type pageKey = "medium" | "organism" | "component" | string | undefined;

export const getPathParam = ():
  | {
      page: pageKey;
      param: string | undefined;
    }
  | undefined => {
  const paths = location.pathname.split("/");
  return {
    page: paths[1],
    param: paths[2],
  };
};
