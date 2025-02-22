import React, { FC } from "react";

type Props = {
  msg?: string;
};

export const NotFound: FC<Props> = ({ msg = "NO RESULT FOUND" }) => {
  return <p>{msg}</p>;
};
