import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appAccountsetting]'
})
export class AccountsettingDirective {

  private _shown = false;

  constructor(private el: ElementRef) {
    this.setup();
  }

  toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.innerHTML = '<img src=\"../../assets/img/invisible.png" width=\"25px\" class="visibility">';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML = '<img src=\"../../assets/img/visible.png"  class="visibility">';
    }
  }setup() {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.innerHTML = `<img src=\"../../assets/img/visible.png"  class="visibility">`;
    span.addEventListener('click', (event) => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }
}
