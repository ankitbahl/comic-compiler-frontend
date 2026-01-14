import {useEffect, useState } from "react";
import useCompile from "./useCompile.ts";

const Compile = () => {
  const [comics, setComics] = useState<{ name: string, size: string }[]>([]);
  const [comicData, setComicData] = useState<{ name: string, size: string }[]>([]);
  const [selectedComic, setSelectedComic] = useState<string | null>(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<{ [index: number]: boolean }>({});
  const [lastClickedCheckbox, setLastClickedCheckbox] = useState<number>(-1);
  const [compilationProgress, setCompilationProgress] = useState<{status: string, completion: number} | null>(null);
  const [activeJob, setActiveJob] = useState<string | null>(null);

  const {getComics, getComicInfo, startCompile, getProgress} = useCompile();
  useEffect(() => {
    getComics((data) => setComics(data));
  }, []);

  useEffect(() => {
    if (activeJob) {
      const interval = setInterval(async () => {
        const res = await getProgress(activeJob)
        setCompilationProgress(res.jobProgress);
        if (res.jobStatus == 'done') {
          setActiveJob(null);
          setCompilationProgress(null);
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [activeJob, getProgress]);


  const comicsList = () => {
    return comics.map((comic) => comicElement(comic));
  }

  const selectedComicList = () => {
    return <div className="selected-comic-list">
      <button onClick={() => setSelectedComic(null)}>Back</button>
      <div className="label select-all" onClick={handleSelectAllClick}>
        <span className={`checkbox ${Object.keys(selectedCheckboxes).length == comicData.length ? 'clicked': ''}`}/>
        <span>Select All</span>
      </div>
      {comicData.map((comicDatum, i) => selectedComicElement(comicDatum, i))}
      <button onClick={handleCompileClick} disabled={compilationProgress !== null || Object.keys(selectedCheckboxes).length == 0}>Compile</button>
      {progressMeter()}
    </div>
  }

  const progressMeter = () => {
    if (!compilationProgress) return null;

    return (
      <div className="progress-meter" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <span className="progress-status">{compilationProgress.status}</span>
        <progress value={compilationProgress.completion} max="1" />
        <span className="progress-percent">
          {Math.round(compilationProgress.completion * 100)}%
        </span>
      </div>
    );
  };

  const handleCompileClick = () => {
    const data = comicData.filter((_d, i) => selectedCheckboxes[i] )
    startCompile(selectedComic, data.map(fileData => fileData.name)).then((jobID: string) => {
      setActiveJob(jobID);
    });
  }

  const handleSelectAllClick = () => {
    const allSelected = Object.keys(selectedCheckboxes).length == comicData.length;
    if (allSelected) {
      setSelectedCheckboxes({});
    } else {
      setSelectedCheckboxes(comicData.reduce((collect: {[index: number]: boolean}, _c, i) => {
        collect[i] = true;
        return collect;
      }, {}));
    }
  }

  const handleComicElementClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {

    const isShiftSelect =  e.shiftKey;
    const selectedCheckboxesCopy = {...selectedCheckboxes};
    if (selectedCheckboxesCopy[index]) {
      delete selectedCheckboxesCopy[index];
    } else {
      selectedCheckboxesCopy[index] = true;
      if (isShiftSelect) {
        for(let i = Math.min(lastClickedCheckbox, index); i <= Math.max(lastClickedCheckbox, index); i++) {
          selectedCheckboxesCopy[i] = true;
        }
      }
    }

    setSelectedCheckboxes(selectedCheckboxesCopy);
    setLastClickedCheckbox(index);
  }

  const selectedComicElement = (selectedComicData: {name: string, size: string}, index: number) =>{
    return <div className="label" onClick={(e) => handleComicElementClick(e, index)}>
      <span className={`checkbox ${selectedCheckboxes[index] ? 'clicked': ''}`}/>
      <span>{selectedComicData.name}</span>
      <span>{selectedComicData.size}</span>
    </div>;
  }

  const comicElement = (comic: {name: string, size: string})=> {
    return <div className="comic" onClick={() => {
      setSelectedComic(comic.name);
      getComicInfo(comic.name, setComicData);
    }}>
      <span>{comic.name}</span>
      <span>{comic.size}</span>
    </div>;
  }

  return <div>
    {
      selectedComic ? selectedComicList() : comicsList()
    }
  </div>;
}

export default Compile;