export interface TableConfig<T> {
  columns: string[];
  options: TableOptions<T>[];
}

export interface TableOptions<T> {
  key: T;
  displayName: string;
  sortable?: boolean;
}
