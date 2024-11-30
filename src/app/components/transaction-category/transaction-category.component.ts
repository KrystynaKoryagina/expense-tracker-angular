import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { AbstractFormControlDirective } from '../../shared/directives/abstract-form-control.directive';
import { TRANSACTION_CATEGORY_OPTIONS } from './transaction-category.config';

@Component({
  selector: 'app-transaction-category',
  templateUrl: './transaction-category.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TransactionCategoryComponent),
      multi: true,
    },
  ],
  imports: [MatFormFieldModule, MatSelectModule, CommonModule],
})
export class TransactionCategoryComponent extends AbstractFormControlDirective {
  categories = TRANSACTION_CATEGORY_OPTIONS;
}
