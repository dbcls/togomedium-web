import { j as jsx } from './StanzaReactProvider-b083349e.js';

const NotFound = ({ msg = "NO RESULT FOUND" }) => {
    return jsx("p", { children: msg });
};

const urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

/* @ts-self-types="./index.d.ts" */
let nanoid = (size = 21) => {
  let id = '';
  let bytes = crypto.getRandomValues(new Uint8Array((size |= 0)));
  while (size--) {
    id += urlAlphabet[bytes[size] & 63];
  }
  return id
};

export { NotFound as N, nanoid as n };
//# sourceMappingURL=index.browser-0883b6be.js.map
