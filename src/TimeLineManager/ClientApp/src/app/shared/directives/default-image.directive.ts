import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'img[default]'
})
export class DefaultImageDirective {
  @Input()
  default: string;

  @HostBinding('src')
  @Input()
  src: string;

  @HostListener('error')
  onError() {
    this.src = this.default;
  }
}
