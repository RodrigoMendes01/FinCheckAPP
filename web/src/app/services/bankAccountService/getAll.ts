
import { BankAccount } from '../../entities/BankAccount';
import { sleep } from '../../utils/sleep';
import httpClient from '../httpClient';

export type BankAccountSResponse = Array<BankAccount>

export async function getAll () {
  await sleep();
  const { data } = await httpClient.get<BankAccountSResponse>('/bank-accounts');

  return data;
}
