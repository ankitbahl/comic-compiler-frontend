import {getWithAxios, postWithAxiosBlob} from "./axios.ts";
import { useState } from "react";

const useDownload = () => {

  const [downloadableComics, setDownloadableComics] = useState<string[]>([]);

  const getDownloadableComics = async (): Promise<{ name: string, size: string }[]> => {
    const res = await getWithAxios('/downloadable-comics');
    setDownloadableComics(res.data);
    return res.data;
  };

  const downloadComic = async (comic: string) => {
    const res = await postWithAxiosBlob('/download-comic', {comic});
    downloadBlob(res.data, comic);
  }

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  }

  return { downloadableComics, downloadComic, getDownloadableComics }
}

export default useDownload;