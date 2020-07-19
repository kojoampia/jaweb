import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
    selector: '[jhiStickyHeader]'
})
export class StickyHeaderDirective {
    private _element: HTMLElement;
    private _isSticky = false;
    private _offsetTop = 0;
    constructor(el: ElementRef) {
        this._element = el.nativeElement;
        this._offsetTop = this._element.offsetTop;

        /* tap into the document scroll event */
        fromEvent(document, 'scroll').subscribe(() => {
            const docTop = this._getDocumentPosition();
            const offset = this._offsetTop;

            if (docTop > offset && !this._isSticky) {
                this._makeSticky();
                this._isSticky = true;
            } else {
                if (docTop < offset && this._isSticky) {
                    this._resetSticky();
                    this._isSticky = false;
                }
            }
        });
    }

    private _getDocumentPosition(): number {
        const docEl = document.documentElement;
        const docRect = docEl.getBoundingClientRect();

        /* this should take care of different browsers */
        const top = -docRect.top || document.body.scrollTop || window.scrollY || docEl.scrollTop || 0;

        return top;
    }

    private _makeSticky() {
        this._element.style.cssText += 'position: -webkit-sticky; position: sticky; ';
        this._element.style.cssText += `box-shadow: 1px 1px 2px rgba(0,0,0,0.5);
                                        -webkit-boxshadow: 1px 1px 2px rgba(0,0,0,0.5);`;
        this._element.style.top = '0px';
    }

    private _resetSticky() {
        this._element.style.position = '';
        this._element.style.top = '';
        this._element.style.boxShadow = '';
        this._element.style.webkitBoxShadow = '';
    }
}
