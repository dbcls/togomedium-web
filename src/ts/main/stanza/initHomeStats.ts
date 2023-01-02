import { qs } from "yohak-tools";
import { ListResponse } from "./types";
import { getData } from "../../utils/getData";

const API_MEDIA = `list_media`;
const API_ORGANISMS = `list_organisms`;
const API_COMPONENTS = `list_components`;

export const initHomeStats = () => {
  setNum(API_MEDIA, qs("#numMedia")!);
  setNum(API_COMPONENTS, qs("#numComponents")!);
  setNum(API_ORGANISMS, qs("#numOrganisms")!);
};

const setNum = async (apiName: string, elm: HTMLElement) => {
  const data = await getData<ListResponse>(apiName);
  const num = data ? parseInt(data.total.toString()) : 0;
  elm.innerText = num.toLocaleString("ja");
};
