
import { BankAccount } from '../../entities/BankAccount';
import httpClient from '../httpClient';

export type BankAccountSResponse = Array<BankAccount>

export async function getAll () {
  const { data } = await httpClient.get<BankAccountSResponse>('/bank-accounts');

  return data;
}
