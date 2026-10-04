// Standalone SPARQList Output; no module dependencies.
export function json({ roles, properties, role_none, property_none }) {
  const facet = (bindings, isRole) => {
    const items = new Map();
    const facetParents = new Map();
    for (const row of bindings) {
      const id = row.id.value;
      const count = Number(row.count.value);
      if (!/^(?:0|[1-9][0-9]*)$/.test(row.count.value) || !Number.isSafeInteger(count)) {
        throw new Error(`Invalid facet count for ${id}.`);
      }
      const key = `${id}\u0000${row.label.value}`;
      const previous = items.get(key);
      if (previous && previous.count !== count) throw new Error(`Conflicting counts for ${id}.`);
      const item = previous ?? { gmo_id: id, label_en: row.label.value, count };
      if (isRole) {
        if (row.parent) {
          const previousParent = facetParents.get(id);
          if (previousParent && previousParent !== row.parent.value) {
            throw new Error(`Multiple parents found for Role ${id}.`);
          }
          facetParents.set(id, row.parent.value);
        }
        item.parent =
          !row.parent || row.parent.value === "http://purl.jp/bio/10/gmo/GMO_000037"
            ? null
            : (row.parent_id?.value ?? null);
      }
      items.set(key, item);
    }
    return [...items.values()];
  };

  const noneCount = (result) => {
    const raw = result.results.bindings[0]?.count?.value;
    const count = Number(raw);
    if (!/^(?:0|[1-9][0-9]*)$/.test(raw ?? "") || !Number.isSafeInteger(count)) {
      throw new Error("Invalid unassigned classification count.");
    }
    return count;
  };
  return {
    role_none_count: noneCount(role_none),
    property_none_count: noneCount(property_none),
    roles: facet(roles.results.bindings, true),
    properties: facet(properties.results.bindings, false),
  };
}
