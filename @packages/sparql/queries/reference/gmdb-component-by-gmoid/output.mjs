// Source: https://github.com/dbcls/togomedium-sparqlist/blob/main/repository/gmdb_component_by_gmoid.md
// Retrieved 2026-09-26. Only the module wrapper is adapted.
export function json({ result }) {
  let rows = result.results.bindings;
  let gmo_component = {};
  if (rows.length > 0) {
    gmo_component["pref_label"] = rows[0].pref_label.value;
  }
  if (rows.length > 0) {
    gmo_component["id"] = rows[0].id.value;
  }
  if (rows.length > 0) {
    if ("label_ja" in rows[0]) gmo_component["label_ja"] = rows[0].label_ja.value;
  }
  let label_ja = [];
  let alt_labels_en = [];
  let alt_labels_ja = [];
  let super_classes = [];
  let sub_classes = [];
  let roles = [];
  let properties = [];
  let links = [];
  let hoge = [];
  for (let i = 0; i < rows.length; i++) {
    if ("alt_label_en" in rows[i]) {
      if (!alt_labels_en.includes(rows[i].alt_label_en.value)) {
        alt_labels_en.push(rows[i].alt_label_en.value);
      }
    }
    if ("alt_label_ja" in rows[i]) {
      if (!alt_labels_ja.includes(rows[i].alt_label_ja.value)) {
        alt_labels_ja.push(rows[i].alt_label_ja.value);
      }
    }
    if ("super_gmo" in rows[i]) {
      if (super_classes.find((obj) => obj.gmo_id == rows[i].super_gmo_id.value) == undefined) {
        super_classes.push({
          gmo_id: rows[i].super_gmo_id.value,
          uri: rows[i].super_gmo.value,
          label_en: rows[i].super_gmo_label_en.value,
        });
      }
    }
    if ("sub_gmo" in rows[i]) {
      if (sub_classes.find((obj) => obj.gmo_id == rows[i].sub_gmo_id.value) == undefined) {
        sub_classes.push({
          gmo_id: rows[i].sub_gmo_id.value,
          uri: rows[i].sub_gmo.value,
          label_en: rows[i].sub_gmo_label_en.value,
        });
      }
    }
    if ("property" in rows[i]) {
      if (properties.find((obj) => obj.gmo_id == rows[i].property_id.value) == undefined) {
        properties.push({
          gmo_id: rows[i].property_id.value,
          uri: rows[i].property.value,
          label_en: rows[i].property_label_en.value,
        });
      }
      /*
        if (!(rows[i].property_id.value in properties)) {
          properties[rows[i].property_id.value] = {} ;
          properties[rows[i].property_id.value].uri = rows[i].property.value ;
          properties[rows[i].property_id.value].label_en = rows[i].property_label_en.value ;
        }
*/
    }
    if ("role" in rows[i]) {
      if (roles.find((obj) => obj.gmo_id == rows[i].role_id.value) == undefined) {
        roles.push({
          gmo_id: rows[i].role_id.value,
          uri: rows[i].role.value,
          label_en: rows[i].role_label_en.value,
        });
      }
    }
    if ("link" in rows[i]) {
      if (!links.includes(rows[i].link.value)) {
        links.push(rows[i].link.value);
      }
    }
  }
  gmo_component["alt_labels_en"] = alt_labels_en;
  gmo_component["alt_labels_ja"] = alt_labels_ja;
  gmo_component["super_classes"] = super_classes;
  gmo_component["sub_classes"] = sub_classes;
  gmo_component["properties"] = properties;
  gmo_component["roles"] = roles;
  gmo_component["links"] = links;
  if (rows.length > 0) {
    return gmo_component;
  } else {
    gmo_component = [];
    return gmo_component;
  }
}
