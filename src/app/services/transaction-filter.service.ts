import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Filters } from '../models/filter';
import { LocalStorageEntities } from '../models/local-storage';

@Injectable({
  providedIn: 'root',
})
export class TransactionFilterService {
  private localStorageService = inject(LocalStorageService);

  addFilters(filters: Filters): void {
    this.localStorageService.set(LocalStorageEntities.FILTERS, filters);
  }

  getFilters(): Filters | undefined {
    return this.localStorageService.get(LocalStorageEntities.FILTERS);
  }
}
