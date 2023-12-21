import { Transaction } from '../../entities/Transaction';
import { sleep } from '../../utils/sleep';
import httpClient from '../httpClient';

export type TransactionsResponse = Array<Transaction>

export type TransactionsFilters = {
  month: number
  year: number
  bankAccountId?: string
  type?: Transaction['type']
}

export async function getAll (filters: TransactionsFilters) {
  await sleep();
  const { data } = await httpClient.get<TransactionsResponse>('/transactions', {
    params: filters
  });

  return data;
}
