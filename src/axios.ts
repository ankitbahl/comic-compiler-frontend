import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const getWithAxios = async (path: string, queryParams?: {[key: string]: string}) => {
  return api.get(path, {params: queryParams})
}

export const postWithAxiosBlob = async (path: string, queryParams?: {[key: string]: string}, onProgress?: (percent: number) => void) => {
  return api.post(path, {}, {
    params: queryParams,
    responseType: "blob",
    onDownloadProgress: (e) => {
      if (!e.total) return;

      const progress = e.loaded / e.total;
      onProgress?.(progress);
    }
  })
}

export const postWithAxios = async (path: string, queryParams?: {[key: string]: string}, body?: {[key: string]: any}) => {
  return api.post(path, body, {params: queryParams})
}