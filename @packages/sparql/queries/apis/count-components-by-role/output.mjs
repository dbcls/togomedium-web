// Merge parent rows without adding their repeated component counts.
export function json({ result }) {
  function count(binding) {
    const value = binding?.value;
    if (typeof value !== "string" || !/^\d+$/.test(value) || !Number.isSafeInteger(Number(value))) {
      throw new Error("Count must be a non-negative safe integer.");
    }
    return Number(value);
  }
  const roles = new Map();
  const parentsByUri = new Map();
  for (const row of result.results.bindings) {
    const uri = row.role.value;
    const id = row.id?.value ?? null;
    const label = row.label?.value ?? null;
    const key = JSON.stringify([uri, id, label]);
    const direct = count(row.direct_count);
    const inclusive = count(row.inclusive_count);
    if (!roles.has(key)) {
      roles.set(key, {
        uri,
        id,
        label,
        direct_count: direct,
        inclusive_count: inclusive,
        parent: null,
      });
    }
    const role = roles.get(key);
    if (role.direct_count !== direct || role.inclusive_count !== inclusive) {
      throw new Error("Counts differ between parent rows for the same Role.");
    }
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
  const rootUri = "http://purl.jp/bio/10/gmo/GMO_000037";
  return [...roles.values()].map((role) => {
    const parent = parentsByUri.get(role.uri);
    const { uri, ...output } = role;
    return { ...output, parent: !parent || parent.uri === rootUri ? null : parent.id };
  });
}
