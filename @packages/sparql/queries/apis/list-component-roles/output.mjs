// Group by URI: IDs and labels are optional in the query.
export function json({ result }) {
  const roles = new Map();
  const parentsByUri = new Map();
  for (const row of result.results.bindings) {
    const uri = row.role.value;
    if (!roles.has(uri)) roles.set(uri, { uri, id: null, labels: [], parent: null });
    const role = roles.get(uri);
    if (row.id) role.id = row.id.value;
    if (row.label && !role.labels.includes(row.label.value)) role.labels.push(row.label.value);
    if (row.parent) {
      const existing = parentsByUri.get(uri);
      if (existing && existing.uri !== row.parent.value) {
        throw new Error(`Multiple parents found for Role ${uri}.`);
      }
      const parent = existing ?? { uri: row.parent.value, id: null };
      if (row.parent_id) parent.id = row.parent_id.value;
      parentsByUri.set(uri, parent);
    }
  }
  return [...roles.values()].map((role) => ({
    ...role,
    parent: parentsByUri.get(role.uri) ?? null,
  }));
}
