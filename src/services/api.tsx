// @ts-ignore
import { Axios } from '@/utils/request';
import { stringify } from 'qs';

export async function query(params) {
  return Axios().get(`/api/chapter?${stringify(params)}`);
}