import { Component } from '@angular/core';
import { PlanesService } from '../services/planes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  planes: any;

  constructor(private planesService: PlanesService) {
    this.planes = this.planesService.getPlanes();
  }
}