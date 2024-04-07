import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { HeaderServiceService } from 'src/app/services/header-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  scrolled = false;
  barsIcon = faBars;
  xmarkIcon = faXmark;
  showHeader: boolean = false;
  showXmarkIcon = false;
  showBarsIcon = true;
  showMidContainer = false;
  showFinalContainer = false;
  showLogo = true;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private headerService: HeaderServiceService,
    private viewPortScroller: ViewportScroller,
  ) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (window.scrollY > 0) {
      this.scrolled = true;
      this.renderer.addClass(document.querySelector('.header'), 'in-scroll');
    } else {
      this.scrolled = false;
      this.renderer.removeClass(document.querySelector('header'), 'in-scroll');
    }
  }

  desplegar() {
    this.showXmarkIcon = true;
    this.showBarsIcon = false;
    this.showMidContainer = true;
    this.showFinalContainer = true;
    this.showLogo = false;

    document.body.style.overflow = 'hidden';

    let header = document.getElementById('header');
    if (header) {
      header.style.height = '100vh';
      header.classList.add('in-scroll');
    }
  }

  contraer() {
    if (window.innerWidth <= 800) {
      this.showXmarkIcon = false;
      this.showBarsIcon = true;
      this.showMidContainer = false;
      this.showFinalContainer = false;
      this.showLogo = true;

      document.body.style.overflow = 'auto';

      let header = document.getElementById('header');
      if (header) {
        header.style.height = 'initial';
      }
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (
          event.urlAfterRedirects.includes('home') ||
          event.urlAfterRedirects === '/productos' ||
          event.urlAfterRedirects === '/' ||
          event.urlAfterRedirects === '/#Nosotros' ||
          event.urlAfterRedirects === '/#planes' ||
          event.urlAfterRedirects === '/#sedes'
        ) {
          this.headerService.showHeader = true;
        } else {
          this.headerService.showHeader = false;
        }
      }
    });

    if (window.innerWidth <= 800) {
      this.contraer();
    } else {
      this.showBarsIcon = false;
      this.showMidContainer = true;
      this.showFinalContainer = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth <= 800) {
      this.contraer();
    } else {
      this.contraer();
      this.showBarsIcon = false;
      this.showMidContainer = true;
      this.showFinalContainer = true;
    }
  }

  irAHome() {
    this.viewPortScroller.scrollToPosition([0, 0]);
  }

  irANosotros() {
    this.viewPortScroller.scrollToAnchor('Nosotros');
  }

  irAPlanes() {
    this.viewPortScroller.scrollToAnchor('planes');
  }

  irASedes() {
    this.viewPortScroller.scrollToAnchor('sedes');
  }

  irAProductos() {
    this.viewPortScroller.scrollToPosition([0, 0]);
  }
}