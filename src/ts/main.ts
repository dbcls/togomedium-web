import { setOnReady } from "yohak-tools";
import { initStanza } from "./main/inistStanza";
import { initHeader } from "./main/initHeader";

declare global {
  interface DocumentEventMap {
    STANZA_ON_QUERY_DATA: CustomEvent<string>;
    STANZA_ON_LOAD_DATA: CustomEvent<string>;
    STANZA_ROUND_TREE_CLICK: CustomEvent<string>;
  }
}

setOnReady(() => {
  initHeader();
  initStanza();
});
