import { Component, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  scrolled = false;

  constructor(private renderer: Renderer2) {}

  @HostListener('window:scroll',['$event'])

  onScroll(event: Event): void {
    if (window.scrollY > 0) {
      this.scrolled = true;
      this.renderer.addClass(document.querySelector('.header'), 'in-scroll');
    } else {
      this.scrolled = false;
      this.renderer.removeClass(document.querySelector('header'),'in-scroll');
    }
  }
}
