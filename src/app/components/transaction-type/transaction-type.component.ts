import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { AbstractFormControlDirective } from '../../shared/directives/abstract-form-control.directive';
import { TRANSACTION_TYPE_OPTIONS } from './transaction-type.config';

@Component({
  selector: 'app-transaction-type',
  templateUrl: './transaction-type.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TransactionTypeComponent),
      multi: true,
    },
  ],
  imports: [MatFormFieldModule, MatSelectModule, CommonModule],
})
export class TransactionTypeComponent extends AbstractFormControlDirective {
  types = TRANSACTION_TYPE_OPTIONS;
}
