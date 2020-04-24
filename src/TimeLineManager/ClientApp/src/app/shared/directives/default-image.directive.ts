import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'img[default]',
})
export class DefaultImageDirective {
  @HostBinding('src')
  @Input()
  src: string;

  @Input()
  default: string;

  @HostListener('error')
  onError() {
    this.src = this.default;
  }
}
