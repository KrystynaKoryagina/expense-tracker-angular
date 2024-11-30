import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Transaction } from '../../models/transaction';
import { TRANSACTION_TABLE_CONFIG } from './transaction-table.config';
import { TransactionFilterService } from '../../services/transaction-filter.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.css',
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatPaginator,
  ],
})
export class TransactionsTableComponent implements OnInit, AfterViewInit {
  transactions = input<Transaction[]>([]);

  private transactionFilterService = inject(TransactionFilterService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  displayedColumns: string[] = TRANSACTION_TABLE_CONFIG.columns;
  tableOptions = TRANSACTION_TABLE_CONFIG.options;

  dataSource = new MatTableDataSource<Transaction>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    effect(() => {
      this.dataSource.data = this.transactions();
    });
  }

  ngOnInit(): void {
    this.handleQueryParams();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private handleQueryParams(): void {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        const filter = this.transactionFilterService.getFilters();

        if (filter) {
          this.dataSource.filter = JSON.stringify(filter);
        } else {
          this.dataSource.filter = '';
        }

        this.applyFilter();
      },
    });
  }

  applyFilter(): void {
    this.dataSource.filterPredicate = (data, filter) => {
      const filterObj = JSON.parse(filter);
      let matchesFilter = true;

      for (const key of Object.keys(filterObj)) {
        if (
          filterObj[key] &&
          !filterObj[key].includes(data[key as keyof Transaction])
        ) {
          matchesFilter = false;
          break;
        }
      }

      return matchesFilter;
    };
  }
}
