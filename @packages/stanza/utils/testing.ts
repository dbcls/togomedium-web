import { RawComponent } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/types";

export const makeRawComponent = (id: string, parent: string | null = null): RawComponent => {
  return {
    gmo_id: id,
    name: id,
    parent,
    function: null,
  };
};
