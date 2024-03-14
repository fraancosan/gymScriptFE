import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderServiceService } from './services/header-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  primeraVez: boolean = true;
  isLoading = true;
  isHomeRoute = false;

  constructor(public headerService: HeaderServiceService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomeRoute = event.url === '/home' || event.url === '/';
        if (this.primeraVez && this.isHomeRoute) {
          this.isLoading = true;
          this.primeraVez = false;
          setTimeout(() => {
            this.isLoading = false;
          }, 2600);
        } else {
          this.isLoading = false;
        }
      }
    });
  }

  ngOnInit(): void {}
}