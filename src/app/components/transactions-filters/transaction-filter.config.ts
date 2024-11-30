import {
  TransactionCategory,
  TransactionFilterKey,
} from '../../models/transaction';

export const TRANSACTION_FILTER_OPTIONS: Record<
  TransactionFilterKey,
  string[]
> = {
  type: ['income', 'expense'],
  category: Object.values(TransactionCategory),
};
