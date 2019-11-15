import { Directive, Input, ElementRef, OnChanges } from '@angular/core';
import { LinkComponent } from './link/link.component';

@Directive({
  selector: '[appLink]'
})
export class LinkDirective implements OnChanges {
  @Input() appStartingLinks: LinkComponent[] = [];
  @Input() appEndingLinks: LinkComponent[] = [];

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.appStartingLinks) {
      this.appStartingLinks.forEach(link => link.start = this.el);
    }
    
    if (this.appEndingLinks) {
      this.appEndingLinks.forEach(link => link.end = this.el);
    }
  }
}