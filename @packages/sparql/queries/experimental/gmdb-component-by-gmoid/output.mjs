// Same response fields as the original API; read optional values from all UNION rows.
export function json({ result }) {
  const rows = result.results.bindings;
  if (!rows.length) return [];
  const output = { pref_label: rows[0].pref_label.value, id: rows[0].id.value };
  const japanese = rows.find((row) => row.label_ja);
  if (japanese) output.label_ja = japanese.label_ja.value;
  for (const [key, variable] of [
    ["alt_labels_en", "alt_label_en"],
    ["alt_labels_ja", "alt_label_ja"],
    ["links", "link"],
  ]) {
    output[key] = [
      ...new Set(rows.filter((row) => row[variable]).map((row) => row[variable].value)),
    ];
  }
  for (const [key, uri, id, label] of [
    ["super_classes", "super_gmo", "super_gmo_id", "super_gmo_label_en"],
    ["sub_classes", "sub_gmo", "sub_gmo_id", "sub_gmo_label_en"],
    ["properties", "property", "property_id", "property_label_en"],
    ["roles", "role", "role_id", "role_label_en"],
  ]) {
    output[key] = [];
    for (const row of rows) {
      if (
        row[uri] &&
        row[id] &&
        row[label] &&
        !output[key].some((item) => item.gmo_id === row[id].value)
      ) {
        output[key].push({
          gmo_id: row[id].value,
          uri: row[uri].value,
          label_en: row[label].value,
        });
      }
    }
  }
  return output;
}
