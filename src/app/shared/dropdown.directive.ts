import { HostListener, Directive, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  constructor(private elRef: ElementRef) {}
  numbeOfClick = 0;

  @HostBinding('class.show') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: MouseEvent) {
    if (this.elRef.nativeElement.contains(event.target)) {
      this.isOpen = true;
      this.numbeOfClick = ++this.numbeOfClick;
    } else {
      this.isOpen = false;
      this.numbeOfClick = 0;
    }

    if (this.numbeOfClick === 2) {
      this.numbeOfClick = 0;
      this.isOpen = false;
    }
  }
}
