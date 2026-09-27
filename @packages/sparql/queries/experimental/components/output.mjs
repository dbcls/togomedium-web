// Standalone function for SPARQList Output.
export function json({ result }) {
  return result.results.bindings.map((row) => ({
    id: row.id.value,
    label: row.label.value,
  }));
}
