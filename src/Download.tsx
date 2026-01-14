import {useEffect} from "react";
import useDownload from "./useDownload.ts";

const Download = () => {
  const { downloadableComics, downloadComic, getDownloadableComics, downloadProgress } = useDownload();
  useEffect(() => {
    getDownloadableComics();
  }, [getDownloadableComics]);

  const progressMeter = () => {
    if (!downloadProgress) return null;

    return (
      <div className="progress-meter" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <progress value={downloadProgress} max="1" />
        <span className="progress-percent">
          {Math.round(downloadProgress * 100)}%
        </span>
      </div>
    );
  };

  const selectedComicElement = (selectedComicData: {name: string, size: string}) =>{
    return <div className="label" onClick={() => downloadComic(selectedComicData.name)}>
      <span>{selectedComicData.name}</span>
      <span>{selectedComicData.size}</span>
    </div>;
  }

  return <div className="selected-comic-list">
    {downloadableComics.map((comicDatum) => selectedComicElement(comicDatum))}
    {progressMeter()}
  </div>
}

export default Download;