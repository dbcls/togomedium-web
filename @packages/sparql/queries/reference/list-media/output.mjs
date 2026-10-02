// Source: source.md, received 2026-09-28; version unknown.
export function json({ result, count }) {
  const parseSparqlObject = (obj) => {
    const result = {};
    try {
      Object.entries(obj).forEach(([key, item]) => {
        result[key] = item["value"];
      });
    } catch (e) {}
    return Object.entries(result).length ? result : null;
  };

  const info = parseSparqlObject(count.results.bindings[0]);
  const total = !!info ? parseInt(info.total) : 0;
  const offset = !!info ? parseInt(info.offset) : 0;
  const limit = !!info ? parseInt(info.limit) : 0;

  const KEY_GM_ID = "media_id";
  const KEY_ORGINAL_GM_ID = "original_media_id";
  const KEY_Label = "label";
  const columns = [
    { key: KEY_GM_ID, label: "Medium" },
    { key: KEY_ORGINAL_GM_ID, label: "Information source" },
    { key: KEY_Label, label: "Name" },
  ];

  const contents = result.results.bindings
    .map((r) => parseSparqlObject(r))
    .map((item) => ({
      [KEY_Label]: !!item.label ? item.label : "",
      [KEY_ORGINAL_GM_ID]: item.original_media_id ?? "",
      [KEY_GM_ID]: {
        label: item.media_id,
        href: `/medium/${item.media_id}`,
      },
    }));
  return { total, offset, contents, columns, limit };
}
