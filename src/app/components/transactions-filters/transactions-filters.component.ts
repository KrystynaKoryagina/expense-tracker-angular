import { MatCardModule } from '@angular/material/card';
import { Component, inject, OnInit } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { TRANSACTION_FILTER_OPTIONS } from './transaction-filter.config';
import { CommonModule } from '@angular/common';
import { TransactionFilterKey } from '../../models/transaction';
import { FilterParams, Filters } from '../../models/filter';
import { TransactionFilterService } from '../../services/transaction-filter.service';

@Component({
  selector: 'app-transactions-filters',
  templateUrl: './transactions-filters.component.html',
  styleUrl: './transactions-filters.component.css',
  imports: [MatChipsModule, MatCardModule, CommonModule],
})
export class TransactionsFiltersComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private transactionFilterService = inject(TransactionFilterService);

  filterOptions = TRANSACTION_FILTER_OPTIONS;
  filterKey = Object.keys(this.filterOptions) as TransactionFilterKey[];

  appliedFilter: Filters = {};

  ngOnInit(): void {
    this.handleSavedFilters();
  }

  private handleSavedFilters(): void {
    const filters = this.transactionFilterService.getFilters();

    if (filters) {
      this.appliedFilter = { ...filters };
      this.updateQueryParams();
    }
  }

  filter({ key, value }: FilterParams): void {
    const currentValues = this.appliedFilter[key] ?? [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    this.appliedFilter = {
      ...this.appliedFilter,
      [key]: updatedValues.length ? updatedValues : [],
    };

    this.updateQueryParams();
    this.transactionFilterService.addFilters(
      this.mapFilterParams(this.appliedFilter)
    );
  }

  isSelected(key: string, option: string): boolean {
    return this.appliedFilter[key] && this.appliedFilter[key].includes(option);
  }

  private mapFilterParams(filters: Filters): Filters {
    return Object.keys(filters).reduce((acc, key) => {
      if (filters[key]?.length) {
        acc[key] = filters[key];
      }

      return acc;
    }, {} as Filters);
  }

  private updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.appliedFilter,
      queryParamsHandling: 'merge',
    });
  }
}
