import {getWithAxios, postWithAxios, postWithAxiosBlob} from "./axios.ts";

const useCompile = () => {

  const getComics = async (onReturn: (data: {name: string, size: string}[]) => void) => {
    const res = await getWithAxios('/comics');
    onReturn(res.data);
  }

  const getComicInfo = async (comic: string, onReturn: (data: {name: string, size: string}[]) => void) => {
    const res = await getWithAxios('/comic-info', { comic });
    onReturn(res.data)
  }

  const startCompile = async (fileName: string | null, data: string[]): Promise<string> => {
    if (!fileName) {
      throw fileName;
    }
    const res = await postWithAxios('/compile-comic', {comic: fileName}, {files: data} );
    return res.data.job_id;
  }

  const getProgress = async (jobId: string): Promise<{jobStatus: string, jobProgress: {status: string, completion: number}}> => {
    const res = await getWithAxios('/comic-progress', { job_id: jobId });
    return res.data;
  }
  return {getComics, getComicInfo, startCompile, getProgress};
}

export default useCompile;