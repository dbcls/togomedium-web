export function json({ result }) {
  return result.results.bindings.map((row) => {
    const value = row.count?.value;
    if (typeof value !== "string" || !/^\d+$/.test(value) || !Number.isSafeInteger(Number(value))) {
      throw new Error("Count must be a non-negative safe integer.");
    }
    return { id: row.id?.value ?? null, label: row.label?.value ?? null, count: Number(value) };
  });
}
