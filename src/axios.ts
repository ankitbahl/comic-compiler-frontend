import axios from "axios";

const url = "http://localhost:8080";

export const getWithAxios = async (path: string, queryParams?: {[key: string]: string}) => {
  const pathWithUrl = `${url}${path}`;
  return axios.get(pathWithUrl, {params: queryParams})
}

export const postWithAxiosBlob = async (path: string, queryParams?: {[key: string]: string}, body?: {[key: string]: any}) => {
  const pathWithUrl = `${url}${path}`;
  return axios.post(pathWithUrl, body, {params: queryParams, responseType: "blob"})
}

export const postWithAxios = async (path: string, queryParams?: {[key: string]: string}, body?: {[key: string]: any}) => {
  const pathWithUrl = `${url}${path}`;
  return axios.post(pathWithUrl, body, {params: queryParams})
}