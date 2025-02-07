import type { SerializedStyles } from "@emotion/serialize";
import type { DOMAttributes } from "react";

declare module "react" {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: SerializedStyles;
  }
  interface SVGAttributes<T> extends DOMAttributes<T> {
    css?: SerializedStyles;
  }
}
