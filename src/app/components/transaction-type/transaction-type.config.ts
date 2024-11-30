import { SelectOption } from '../../models/select-option';
import { TransactionType } from '../../models/transaction';

export const TRANSACTION_TYPE_OPTIONS: SelectOption<TransactionType>[] = [
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
];
