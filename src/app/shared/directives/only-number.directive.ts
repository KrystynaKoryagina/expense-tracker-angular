import { Directive, ElementRef, HostListener } from '@angular/core';
import { ONLY_NUMBER_PATTERN } from '../constants/patterns';

@Directive({
  selector: '[appOnlyNumbers]',
})
export class OnlyNumbersDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput() {
    const inputElement = this.el.nativeElement;

    inputElement.value = inputElement.value.replace(ONLY_NUMBER_PATTERN, '');
  }
}
