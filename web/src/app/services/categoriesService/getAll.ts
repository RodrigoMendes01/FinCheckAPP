import { Category } from '../../entities/Category';
import { sleep } from '../../utils/sleep';
import httpClient from '../httpClient';

export type CategoriesResponse = Array<Category>

export async function getAll () {
  await sleep();
  const { data } = await httpClient.get<CategoriesResponse>('/categories');

  return data;
}
