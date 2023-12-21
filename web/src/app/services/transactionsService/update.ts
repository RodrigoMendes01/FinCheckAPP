import { sleep } from '../../utils/sleep';
import httpClient from '../httpClient';

export interface UpdateTransactionParams {
  id: string
  bankAccountId: string
  categoryId: string
  name: string
  value: number
  date: string
  type: 'INCOME' | 'EXPENSE' | undefined
}

export async function update({id, ...params}: UpdateTransactionParams) {
  await sleep();
  const { data } = await httpClient.put(`/transactions/${id}`, params);

  return data;
}
