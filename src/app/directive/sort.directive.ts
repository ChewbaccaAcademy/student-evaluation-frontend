import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { Student } from '../model/student';
import { Sort } from '../shared/sort';
import { get as lodashGet } from  'lodash';

@Directive({
  selector: '[appSort]'
})
export class SortDirective{

  @Input() appSort: Student[]
  constructor(private renderer: Renderer2, private targetElem: ElementRef) { }

  @HostListener("click")
  sortdata() {
    const sort = new Sort();
    const elem = this.targetElem.nativeElement;
    const order = elem.getAttribute("data-order");
    const property = elem.getAttribute("data-name");

    const dir = +order === -1 ? 1 : -1;
    this.appSort.sort((a, b)=> lodashGet(a, property) < lodashGet(b, property) ? (-1 * dir) : (1 * dir));

    if(+order === -1) {
      elem.setAttribute("data-order", 1);
    } else {
      elem.setAttribute("data-order", -1);
    }
  }
}
