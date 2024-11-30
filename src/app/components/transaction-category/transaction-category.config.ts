import { SelectOption } from '../../models/select-option';
import { TransactionCategory } from '../../models/transaction';

export const TRANSACTION_CATEGORY_OPTIONS: SelectOption<TransactionCategory>[] =
  [
    { value: TransactionCategory.Groceries, label: 'Groceries' },
    { value: TransactionCategory.Salary, label: 'Salary' },
    { value: TransactionCategory.Entertainment, label: 'Entertainment' },
    { value: TransactionCategory.Transport, label: 'Transport' },
    { value: TransactionCategory.Unassigned, label: 'Unassigned' },
  ];
