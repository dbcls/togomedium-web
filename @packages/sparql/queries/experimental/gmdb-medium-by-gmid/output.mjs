// Source: https://github.com/dbcls/togomedium-sparqlist/blob/main/repository/gmdb_medium_by_gmid.md
// Retrieved 2026-09-26. Only the module wrapper is adapted.
export function json({ metadata, component_table, comment_list }) {
  const parseSparqlObject = (obj) => {
    const result = {};
    try {
      Object.entries(obj).forEach(([key, item]) => {
        switch (item.datatype) {
          case "http://www.w3.org/2001/XMLSchema#decimal":
            result[key] = parseFloat(item["value"]);
            break;
          case "http://www.w3.org/2001/XMLSchema#integer":
            result[key] = parseInt(item["value"], 10);
            break;
          default:
            result[key] = item["value"];
        }
      });
    } catch (e) {}
    return Object.entries(result).length ? result : null;
  };
  const reduceComponentParagraphs = (accum, current) => {
    const index = accum.findIndex((item) => item.paragraph_index === current.paragraph_index);
    if (index === -1) {
      accum.push({
        paragraph_index: current.paragraph_index,
        subcomponent_name: current.subcomponent_name,
        items: [processComponentItem(current)],
      });
    } else {
      accum[index].items.push(processComponentItem(current));
    }
    return accum;
  };
  const processComponentItem = (item) => {
    const result = {
      ...item,
      properties: item.property_id
        ? [
            {
              id: item.property_id,
              uri: item.property,
              label: item.property_label,
            },
          ]
        : [],
      roles: item.role_id ? [{ id: item.role_id, uri: item.role, label: item.role_label }] : [],
    };
    delete result.paragraph_index;
    delete result.subcomponent_name;
    delete result.property;
    delete result.property_id;
    delete result.property_label;
    delete result.role;
    delete result.role_id;
    delete result.role_label;
    return result;
  };
  const reduceComponentItems = (accum, current) => {
    const hasGmoId = !!current.gmo_id;
    const index = hasGmoId ? accum.findIndex((item) => item.gmo_id === current.gmo_id) : -1;
    if (index === -1) {
      accum.push(current);
    } else {
      const target = accum[index];
      if (current.properties.length) {
        const currentPropId = current.properties[0].id;
        if (target.properties.findIndex((prop) => prop.id === currentPropId) === -1) {
          target.properties = [...target.properties, ...current.properties];
        }
      }
      if (current.roles.length) {
        const currentRoleId = current.roles[0].id;
        if (target.roles.findIndex((role) => role.id === currentRoleId) === -1) {
          target.roles = [...target.roles, ...current.roles];
        }
      }
    }
    return accum;
  };
  const meta = parseSparqlObject(metadata.results.bindings[0]);
  const components = component_table.results.bindings
    .map((obj) => parseSparqlObject(obj))
    .reduce((accum, current) => reduceComponentParagraphs(accum, current), [])
    .map((obj) => ({
      ...obj,
      items: obj.items.reduce((accum, current) => reduceComponentItems(accum, current), []),
    }));
  const comments = comment_list.results.bindings.map((obj) => parseSparqlObject(obj));
  return { meta, components, comments };
}
