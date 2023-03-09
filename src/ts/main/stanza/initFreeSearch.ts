import animateScrollTo from "animated-scroll-to";
import { debounceTime, fromEvent, map, ObservableInput, startWith } from "rxjs";
import { qs, setStyle } from "yohak-tools";
import { ListResponse } from "./types";
import { URL_API } from "../../consts";
import { getData } from "../../utils/getData";

const API_LIST_PARAMS = "&limit=10&offset=0";
const API_MEDIA_BY_ID = "gmdb_list_media_by_gmids?gm_ids=";
const API_MEDIA_BY_KEYWORD = "gmdb_list_media_by_keyword?keyword=";
const API_COMPONENTS_BY_ID = "gmdb_list_components_by_gmoids?gmo_ids=";
const API_COMPONENTS_BY_KEYWORD = "gmdb_list_components_by_keyword?keyword=";
const API_ORGANISMS_BY_ID = "gmdb_list_organisms_by_taxids?tax_ids=";
const API_ORGANISMS_BY_KEYWORD = "gmdb_list_organisms_by_keyword?keyword=";

export const initFreeSearch = () => {
  const info: HTMLElement = qs("#info")!;
  const stanzas: HTMLElement = qs("#stanzaWrapper")!;
  const input: HTMLInputElement = qs("#queryInput")!;
  //
  const urlQuery = getUrlQuery();
  if (urlQuery) {
    input.value = urlQuery;
    animateScrollTo(input);
  }
  //
  const originalValue = input.value;
  const input$: ObservableInput<string> = fromEvent(input, "input").pipe(
    map(() => input.value),
    startWith(originalValue),
    debounceTime(300)
  );
  input$.subscribe((r) => {
    !!r ? toggleDisplay(stanzas, info) : toggleDisplay(info, stanzas);
  });
  input$.pipe(map((r) => mapToQuery(r))).subscribe((r) => {
    showSearching();
    switch (true) {
      case !!r.gm_ids:
        return loadMediaByIDs(r.gm_ids);
      case !!r.gmo_ids:
        return loadComponentsByIds(r.gmo_ids);
      case !!r.tax_ids:
        return loadOrganismsByIds(r.tax_ids);
      case !!r.keyword:
        return loadItemsByKeyWords(r.keyword);
      default:
        return null;
    }
  });
};

const getUrlQuery = () => {
  return location.search.split("=").pop()?.replace(/\+/g, " ").trim();
};

const mapToQuery = (original: string): QueryKeys => {
  const arr: string[] = original
    .split(",")
    .map((str) => str.trim())
    .filter((str) => !!str);

  const gm_ids = arr.filter((str) => matchWithGMID(str)).join(",");
  const gmo_ids = arr.filter((str) => matchWithGMOID(str)).join(",");
  const tax_ids = arr.filter((str) => matchWithTAXID(str)).join(",");
  const ids: string[] = `${gm_ids},${gmo_ids},${tax_ids}`.split(",");
  const keywords = arr.filter((str) => ids.indexOf(str) === -1);
  const keyword: string = keywords.length ? keywords[0] : "";

  return {
    gm_ids,
    gmo_ids,
    tax_ids,
    keyword,
  };
};

const toggleDisplay = (toShow: HTMLElement, toHide: HTMLElement) => {
  setStyle(toShow, { display: "block" });
  setStyle(toHide, { display: "none" });
};

const getListData = async (apiName: string, query: string): Promise<ListResponse | undefined> => {
  const api = `${apiName}${encodeURIComponent(query)}${API_LIST_PARAMS}`;
  return await getData<ListResponse>(api);
};

const loadMediaByIDs = async (query: string) => {
  const result = await getListData(API_MEDIA_BY_ID, query);
  if (hasContents(result)) {
    clearWrapper();
    const title = `Media of ${query}`;
    insertStanza(API_MEDIA_BY_ID, query, title);
  } else {
    showNotFound();
  }
};

const loadComponentsByIds = async (query: string) => {
  const result = await getListData(API_COMPONENTS_BY_ID, query);
  if (hasContents(result)) {
    clearWrapper();
    const title = `Components of ${query}`;
    insertStanza(API_COMPONENTS_BY_ID, query, title);
  } else {
    showNotFound();
  }
};

const loadOrganismsByIds = async (query: string) => {
  const result = await getListData(API_ORGANISMS_BY_ID, query);
  if (hasContents(result)) {
    clearWrapper();
    const title = `Organisms of ${query}`;
    insertStanza(API_ORGANISMS_BY_ID, query, title);
  } else {
    showNotFound();
  }
};
const loadItemsByKeyWords = async (query: string) => {
  const [media, components, organisms] = await Promise.all([
    getListData(API_MEDIA_BY_KEYWORD, query),
    getListData(API_COMPONENTS_BY_KEYWORD, query),
    getListData(API_ORGANISMS_BY_KEYWORD, query),
  ]);

  const hasMedia = hasContents(media);
  const hasComponents = hasContents(components);
  const hasOrganisms = hasContents(organisms);
  clearWrapper();
  hasMedia ? showMediaByKeyword(query) : "";
  hasComponents ? showComponentsByKeyword(query) : "";
  hasOrganisms ? showOrganismsByKeyword(query) : "";
  !hasMedia && !hasComponents && !hasOrganisms ? showNotFound() : "";
};

const showSearching = () => {
  clearWrapper();
  const searching = document.createElement("div");
  searching.textContent = "Searching";
  searching.classList.add("message");
  searching.classList.add("blink");
  findWrapper().appendChild(searching);
};

const showMediaByKeyword = (query: string) => {
  const title = `Media`;
  insertStanza(API_MEDIA_BY_KEYWORD, query, title);
};

const showComponentsByKeyword = (query: string) => {
  const title = `Components`;
  insertStanza(API_COMPONENTS_BY_KEYWORD, query, title);
};

const showOrganismsByKeyword = (query: string) => {
  const title = `Organisms`;
  insertStanza(API_ORGANISMS_BY_KEYWORD, query, title);
};

const matchWithGMID = (str: string): boolean => {
  switch (true) {
    case str.match(/^JCM_M(\d+)$/) !== null:
    case str.match(/^NBRC_M(\d+)$/) !== null:
    case str.match(/^HM(\w+)$/) !== null:
    case str.match(/^SY\d(\w*)$/) !== null:
    case str.match(/^M\d(\w*)$/) !== null:
      return true;
    default:
      return false;
  }
};

const matchWithGMOID = (str: string): boolean => {
  return str.match(/^GMO_(\d){6}$/) !== null;
};

const matchWithTAXID = (str: string): boolean => {
  return str.match(/^(\d){1,7}$/) !== null;
};

const insertStanza = (apiName: string, query: string, title: string): void => {
  const inner = document.createElement("div");
  const api = `${URL_API}${apiName}${encodeURIComponent(query)}`;
  findWrapper().append(inner);
  inner.innerHTML = createListStanza(api, title);
};

const createListStanza = (api: string, title: string): string => {
  return `<togostanza-gmdb-meta-list api_url="${api}" limit="10" title="${title}" column_names="true" togostanza-menu-placement="none" ></togostanza-gmdb-meta-list>`;
};

const showNotFound = () => {
  clearWrapper();
  const notFound = document.createElement("div");
  notFound.textContent = "Not Found";
  notFound.classList.add("message");
  findWrapper().appendChild(notFound);
};

const clearWrapper = () => {
  const wrapper = findWrapper();
  wrapper.innerHTML = "";
};

const findWrapper = (): HTMLElement => {
  return qs("#stanzaWrapper")!;
};

const hasContents = (obj: ListResponse | undefined): boolean => {
  if (!obj) {
    return false;
  }
  return parseInt(obj.total.toString(), 10) > 0;
};

type QueryKeys = {
  gm_ids: string;
  gmo_ids: string;
  tax_ids: string;
  keyword: string;
};
