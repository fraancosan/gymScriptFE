import { Component, HostListener, Renderer2 } from '@angular/core';
import {faBars, faXmark} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  scrolled = false;
  barsIcon = faBars;
  xmarkIcon = faXmark;

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
    this.visible('xmarkIcon','barsIcon');
    this.visible('mid-container','');
    this.visible('final-container','');
  }

  contraer() {
    this.visible('barsIcon','xmarkIcon');
    this.visible('','mid-container');
    this.visible('','final-container');
  }


}
