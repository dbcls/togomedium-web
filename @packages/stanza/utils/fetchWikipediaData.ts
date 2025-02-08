export type WikipediaData = {
  thumb?: string;
  description?: string;
  link: string;
};
export const fetchWikipediaData = async (link: string): Promise<WikipediaData> => {
  const key = link.split("/").pop();
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${key}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data) return { link };
  return { thumb: data.thumbnail?.source, description: data.extract, link };
};
