import { Component } from '@angular/core';
import { HeaderServiceService } from './services/header-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  primeraVez: boolean = true;

  constructor(public headerService: HeaderServiceService) {}

  ngOnInit(): void {}
}
