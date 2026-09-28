// Source: source.md, received 2026-09-28; version unknown.
export function json({ result }) {
  const lineageRanks = [
    "domain",
    "phylum",
    "class",
    "order",
    "family",
    "genus",
    "species",
    "strain",
  ];
  const output = [];
  result.results.bindings.forEach((row) => {
    const existingMedium = output.find((item) => item.gm_id === row.medium_id.value);
    const medium = existingMedium || {};
    if (!existingMedium) {
      medium.gm_id = row.medium_id.value;
      medium.label = row.medium_name.value;
      medium.original_media_id = row.original_media_id?.value ?? "";
      medium.organisms = [];
      output.push(medium);
    }
    const existingOrganism = medium.organisms.find((o) => o.strain.id === row.strain_id.value);
    const organism =
      existingOrganism ||
      lineageRanks.reduce((accum, current) => {
        return current === "strain"
          ? {
              ...accum,
              strain: { id: row.strain_id.value, label: row.strain_name.value },
            }
          : { ...accum, [current]: null };
      }, {});
    const rank = row.rank.value.split("/").pop().toLowerCase();
    if (rank !== "strain") {
      organism[rank] = {
        id: row.ancestor_tax.value.split("/").pop(),
        label: row.ancestor_tax_name.value,
      };
    }
    if (!existingOrganism) {
      medium.organisms.push(organism);
    }
  });
  return output;
}
