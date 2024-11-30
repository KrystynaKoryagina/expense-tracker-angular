import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageEntities } from '../models/local-storage';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly localStorageService = inject(LocalStorageService);

  private readonly transactionsSignal = signal<Transaction[]>(
    this.getTransactions() ?? []
  );

  addTransaction(transaction: Transaction): void {
    const savedTransactions = this.getTransactions();
    const updatedTransactions = savedTransactions
      ? [...savedTransactions, transaction]
      : [transaction];

    this.localStorageService.set(
      LocalStorageEntities.TRANSACTIONS,
      updatedTransactions
    );

    this.transactionsSignal.set(updatedTransactions);
  }

  private getTransactions(): Transaction[] | undefined {
    const savedTransactions: Transaction[] = this.localStorageService.get(
      LocalStorageEntities.TRANSACTIONS
    );

    return savedTransactions;
  }

  get transactions$(): WritableSignal<Transaction[]> {
    return this.transactionsSignal;
  }
}
