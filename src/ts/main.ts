import { setOnReady } from "yohak-tools";
import { initStanza } from "./main/inistStanza";
import { initHeader } from "./main/initHeader";

setOnReady(() => {
  initHeader();
  initStanza();
});
