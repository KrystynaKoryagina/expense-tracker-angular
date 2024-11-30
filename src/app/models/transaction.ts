export interface Transaction {
  name: string;
  amount: string;
  type: TransactionType;
  category: string;
  date: string;
}

export type TransactionKey = keyof Transaction;

export type TransactionType = 'income' | 'expense';

export enum TransactionCategory {
  Groceries = 'groceries',
  Salary = 'salary',
  Entertainment = 'entertainment',
  Transport = 'transport',
  Unassigned = 'unassigned',
}

export type TransactionFilterKey = 'type' | 'category';
