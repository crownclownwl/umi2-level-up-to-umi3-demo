// @ts-ignore
import {Axios} from '@/utils/request';
import { stringify } from 'qs';

export async function queryChapter(params) {
  return Axios(`/api/chapter?${stringify(params)}`);
}


export async function queryQuestions(params) {
  return Axios(`/api/questions?${stringify(params)}`);
}

export async function queryTestPapers() {
  return Axios(`/api/test/paper`);
}

export async function saveTestResult(params) {
  return Axios('/api/test/result', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}