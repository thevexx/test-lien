import { Component, OnInit, Input, Output, ElementRef, EventEmitter, HostListener, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent {
  private static id = 0;
  id = ++LinkComponent.id;

  @Input() start: ElementRef;
  @Input() end: ElementRef;

  @Input() strokeWidth = 3;
  @Input() color = 'red';

  constructor(private changeDetectorRef: ChangeDetectorRef) {

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.changeDetectorRef.detectChanges();
  }

  get startRect() {
    return this.start.nativeElement.getBoundingClientRect()
  }

  get endRect() {
    return this.end.nativeElement.getBoundingClientRect();
  }

  get top(): number {
    if (this.start && this.end) {
      return Math.min(this.startRect.top, this.endRect.top);
    }

    return 0;
  }

  get left(): number {
    if (this.start && this.end) {
      return Math.min(this.startRect.right, this.endRect.right);
    }

    return 0;
  }

  get width(): number {
    if (this.start && this.end) {
      if (this.startRect.right < this.endRect.left) {
        return this.endRect.left - this.startRect.right;
      } else {
        return this.endRect.right - this.startRect.left;
      }
    }

    return 0;
  } 

  get height(): number {
    if (this.start && this.end) {
      return Math.max(this.startRect.bottom, this.endRect.bottom) - this.top;
    }

    return 0;
  }

  get linkStartX(): number {
    if(this.startRect.x < this.endRect.x) {
      return this.startRect.right;
    } else {
      return this.startRect.left;
    }
  }

  get linkStartY(): number {
    return this.startRect.top + this.startRect.height / 2;
  }

  get linkEndX(): number {
    if(this.startRect.x < this.endRect.x) {
      return this.endRect.left;
    } else {
      return this.endRect.right;
    }
  }

  get linkEndY(): number {
    return this.endRect.top + this.endRect.height / 2;
  }

  get path(): string {
    const x1 = this.linkEndX - this.linkStartX;
    const y1 = this.linkEndY - this.linkStartY;

    return this.drawCurvedLine(x1, y1, 0, 0, 0.2);
  }

  get transform(): string {
    return `translate(${this.linkStartX - this.left}, ${this.linkStartY - this.top})`;
  }

  get markerX(): number {
    return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.linkEndY - this.linkStartY, 2)) / 6;
  }

  private drawCurvedLine(x1, y1, x2, y2, tension): string {
    const delta = (x2 - x1) * tension;
    const hx1 = x1 + delta;
    const hy1 = y1;
    const hx2 = x2 - delta;
    const hy2 = y2;

    return `M ${x1} ${y1} C ${hx1} ${hy1} ${hx2} ${hy2} 0 0`;
  }
}