import { TableConfig } from '../../models/table';
import { TransactionKey } from '../../models/transaction';

export const TRANSACTION_TABLE_CONFIG: TableConfig<TransactionKey> = {
  columns: ['position', 'name', 'type', 'amount', 'category', 'date'],
  options: [
    { key: 'name', displayName: 'Name' },
    { key: 'type', displayName: 'Type' },
    { key: 'amount', displayName: 'Amount', sortable: true },
    { key: 'category', displayName: 'Category' },
    { key: 'date', displayName: 'Date', sortable: true },
  ],
};
