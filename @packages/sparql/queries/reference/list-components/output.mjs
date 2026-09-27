// Source: https://github.com/dbcls/togomedium-sparqlist/blob/main/repository/list_components.md
// Retrieved 2026-09-26. Only the module wrapper is adapted.
export function json({ result, count }) {
  let rows = result.results.bindings;
  let count_rows = count.results.bindings[0];
  let components = {};
  components.contents = [];

  components.total = 0;
  components.limit = 0;
  components.offset = 0;

  if (rows.length == 0) {
    return components;
  }
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].alt_labels && rows[i].alt_labels.value.length > 0) {
      components.contents.push({
        gmo_id: { label: rows[i].gmo_id.value, href: "/component/" + rows[i].gmo_id.value },
        name: rows[i].label.value + "; " + rows[i].alt_labels.value,
      });
    } else {
      components.contents.push({
        gmo_id: { label: rows[i].gmo_id.value, href: "/component/" + rows[i].gmo_id.value },
        name: rows[i].label.value,
      });
    }
  }

  components.columns = [];
  components.columns.push({ key: "gmo_id", label: "GMO ID" });
  components.columns.push({ key: "name", label: "Name" });
  components.total = count_rows.total.value;
  components.limit = count_rows.limit.value;
  components.offset = count_rows.offset.value;
  return components;
}
