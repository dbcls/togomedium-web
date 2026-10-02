// The function body can be used as SPARQList's json({ result, count }).
export function json({ result, count, roles, properties }) {
  const pagination = count.results.bindings[0];
  if (!pagination) throw new Error("Count result is missing.");

  const components = new Map();
  const parents = new Map();
  for (const row of result.results.bindings) {
    const id = row.gmo_id.value;
    if (!components.has(id)) {
      components.set(id, {
        id,
        name: row.label.value,
        aliases: [],
        matched_names: [],
        medium_count: Number(row.medium_count?.value ?? 0),
        properties: [],
        roles: [],
      });
    }

    if (row.role_id && row.role_parent) {
      const key = row.role_id.value;
      const previous = parents.get(key);
      if (previous && previous.uri !== row.role_parent.value) {
        throw new Error(`Multiple parents found for Role ${key}.`);
      }
      const parent = previous ?? { uri: row.role_parent.value, id: null };
      if (row.role_parent_id) parent.id = row.role_parent_id.value;
      parents.set(key, parent);
    }
    const component = components.get(id);
    if (row.alias && !component.aliases.includes(row.alias.value)) {
      component.aliases.push(row.alias.value);
    }
    if (row.matched_name && !component.matched_names.includes(row.matched_name.value)) {
      component.matched_names.push(row.matched_name.value);
    }
    for (const [key, idKey, labelKey] of [
      ["properties", "property_id", "property_label_en"],
      ["roles", "role_id", "role_label_en"],
    ]) {
      if (!row[idKey] || !row[labelKey]) continue;
      const item = { gmo_id: row[idKey].value, label_en: row[labelKey].value };
      if (
        !component[key].some(
          (existing) => existing.gmo_id === item.gmo_id && existing.label_en === item.label_en,
        )
      ) {
        component[key].push(item);
      }
    }
  }

  for (const component of components.values()) {
    for (const role of component.roles) {
      const parent = parents.get(role.gmo_id);
      role.parent =
        !parent || parent.uri === "http://purl.jp/bio/10/gmo/GMO_000037" ? null : parent.id;
    }
  }

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

  return {
    contents: [...components.values()],
    // Preserve the original API's string-valued pagination fields.
    total: pagination.total.value,
    limit: pagination.limit.value,
    offset: pagination.offset.value,
    facets: {
      roles: facet(roles.results.bindings, true),
      properties: facet(properties.results.bindings, false),
    },
  };
}
