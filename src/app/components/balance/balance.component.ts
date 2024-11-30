import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css',
  imports: [CommonModule],
})
export class BalanceComponent {
  private readonly transactionService = inject(TransactionService);

  totalBalance = computed(() => {
    const transactions = this.transactionService.transactions$();

    return transactions.reduce((acc, item) => {
      if (item.type === 'income') {
        return acc + parseFloat(item.amount);
      } else if (item.type === 'expense') {
        return acc - parseFloat(item.amount);
      }

      return acc;
    }, 0);
  });
}
