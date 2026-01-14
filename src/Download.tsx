import {useEffect} from "react";
import useDownload from "./useDownload.ts";

const Download = () => {
  const { downloadableComics, downloadComic, getDownloadableComics } = useDownload();
  useEffect(() => {
    getDownloadableComics();
  }, [getDownloadableComics]);


  const selectedComicElement = (selectedComicData: {name: string, size: string}) =>{
    return <div className="label" onClick={() => downloadComic(selectedComicData.name)}>
      <span>{selectedComicData.name}</span>
      <span>{selectedComicData.size}</span>
    </div>;
  }

  return <div className="selected-comic-list">
    {downloadableComics.map((comicDatum) => selectedComicElement(comicDatum))}
  </div>
}

export default Download;