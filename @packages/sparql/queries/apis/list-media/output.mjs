export function json({ result, count }) {
  const parseCount = (binding, name) => {
    const value = binding?.value;
    if (typeof value !== "string" || !/^\d+$/.test(value) || !Number.isSafeInteger(Number(value))) {
      throw new Error(`${name} must be a non-negative safe integer.`);
    }
    return Number(value);
  };
  const info = count.results.bindings[0];
  const total = info ? parseInt(info.total.value, 10) : 0;
  const offset = info ? parseInt(info.offset.value, 10) : 0;
  const limit = info ? parseInt(info.limit.value, 10) : 0;
  const contents = result.results.bindings.map((item) => ({
    media_id: item.media_id.value,
    original_media_id: item.original_media_id?.value ?? "",
    label: item.label?.value ?? "",
    source_uri: item.source_uri?.value ?? "",
    strain_count: parseCount(item.strain_count, "strain_count"),
    species_count: parseCount(item.species_count, "species_count"),
    ph: item.ph?.value ?? "",
  }));
  return { total, offset, limit, contents };
}
