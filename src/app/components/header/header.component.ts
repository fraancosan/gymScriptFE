import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
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

  visible(id: string, id2: string) {
    let elemento = document.getElementById(id);
    let elemento2 = document.getElementById(id2);

    //Muestra elementos
    if (elemento) {
      elemento.classList.remove('hidden');
    }

    //Oculta elementos
    if (elemento2) {
      elemento2.classList.add('hidden');
    }
  }

  desplegar() {
    this.visible('xmarkIcon', 'barsIcon');
    this.visible('mid-container', '');
    this.visible('final-container', '');
    this.visible('', 'logo');

    // Bloqueo el scroll en todo el documento
    document.body.style.overflow = 'hidden';

    // Hago que el header ocupe todo el alto de la pantalla
    // Tambien hago que tenga si o si background
    let header = document.getElementById('header');
    if (header) {
      header.style.height = '100vh';
      header.classList.add('in-scroll');
    }
  }

  contraer() {
    if (window.innerWidth <= 800) {
      this.visible('barsIcon', 'xmarkIcon');
      this.visible('', 'mid-container');
      this.visible('', 'final-container');
      this.visible('logo', '');

      // Desbloqueo el scroll en todo el documento
      document.body.style.overflow = 'auto';

      // Hago que el header ocupe el alto original de la pantalla
      let header = document.getElementById('header');
      if (header) {
        header.style.height = 'initial';
      }
    }
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verifica la ruta actual y muestra u oculta el encabezado según sea necesario
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
      this.visible('', 'barsIcon');
      this.visible('mid-container', '');
      this.visible('final-container', '');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth <= 800) {
      this.contraer();
    } else {
      this.contraer();
      this.visible('', 'barsIcon');
      this.visible('mid-container', '');
      this.visible('final-container', '');
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
