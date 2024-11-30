import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { format } from 'date-fns';
import { TransactionService } from '../../services/transaction.service';
import { TransactionCategoryComponent } from '../transaction-category/transaction-category.component';
import { TransactionTypeComponent } from '../transaction-type/transaction-type.component';
import { OnlyNumbersDirective } from '../../shared/directives/only-number.directive';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import {
  Transaction,
  TransactionCategory,
  TransactionType,
} from '../../models/transaction';
import { AMOUNT_PATTERN } from '../../shared/constants/patterns';

interface TransactionForm {
  name: FormControl<string>;
  amount: FormControl<string>;
  type: FormControl<TransactionType>;
  category: FormControl<TransactionCategory>;
  date: FormControl<Date>;
}

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'auto' },
    },
  ],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    TransactionCategoryComponent,
    TransactionTypeComponent,
    OnlyNumbersDirective,
    DatepickerComponent,
  ],
})
export class TransactionFormComponent implements OnInit {
  transactionForm!: FormGroup<TransactionForm>;

  private readonly transactionService = inject(TransactionService);

  ngOnInit(): void {
    this.initTransactionForm();
  }

  private initTransactionForm(): void {
    this.transactionForm = new FormGroup<TransactionForm>({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      amount: new FormControl('0.00', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(AMOUNT_PATTERN)],
      }),
      type: new FormControl<TransactionType>('income', {
        nonNullable: true,
      }),
      category: new FormControl(TransactionCategory.Unassigned, {
        nonNullable: true,
      }),
      date: new FormControl(new Date(), {
        nonNullable: true,
      }),
    });
  }

  onSave(): void {
    const transactionValue = {
      ...this.transactionForm.value,
      date: this.convertedDate,
    } as Transaction;

    this.transactionService.addTransaction(transactionValue);
    this.resetForm();
  }

  onCancel(): void {
    this.resetForm();
  }

  get convertedDate(): string {
    const date = this.transactionForm.value.date || '';
    return format(date, 'MM/dd/yyyy');
  }

  get isFormInvalid(): boolean {
    return this.transactionForm.invalid;
  }

  private resetForm(): void {
    this.transactionForm.reset();
  }
}
