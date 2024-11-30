import { Routes } from '@angular/router';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'transactions',
    pathMatch: 'full',
  },
  {
    path: 'transactions',
    component: TransactionsPageComponent,
  },
];
