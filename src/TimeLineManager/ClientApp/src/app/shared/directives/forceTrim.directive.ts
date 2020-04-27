import { ElementRef, HostListener } from '@angular/core';
import { Output, EventEmitter, Renderer2 } from '@angular/core';
import { Directive, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[forceTrim]'
})
export class TrimDirective {

  @Output() ngModelChange = new EventEmitter();
  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {
  }

  @HostListener('input', ['$event.target.value'])
  handleInput(inputValue: any): void {
    const valueToProcess = inputValue.trim();
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', valueToProcess);
    this.ngModelChange.emit(valueToProcess);
  }
}
