import { Component, computed, inject } from '@angular/core';
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';
import { TransactionsTableComponent } from '../../components/transactions-table/transactions-table.component';
import { TransactionsFiltersComponent } from '../../components/transactions-filters/transactions-filters.component';
import { BalanceComponent } from '../../components/balance/balance.component';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css'],
  imports: [
    TransactionFormComponent,
    TransactionsTableComponent,
    TransactionsFiltersComponent,
    BalanceComponent,
  ],
})
export class TransactionsPageComponent {
  private transactionService = inject(TransactionService);
  transactions$ = this.transactionService.transactions$();

  transactionsList = computed(() => {
    return this.transactionService.transactions$();
  });
}
