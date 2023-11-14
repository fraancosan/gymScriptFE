import { Component } from '@angular/core';
import { ConeccionService } from '../services/bd/coneccion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  planes: any;

  constructor(private bd: ConeccionService) {
    bd.getAll("planes", "planes").subscribe((planes: any) => {
      for (let i = 0; i < planes.length; i++) {
        planes[i].descripcion = planes[i].descripcion.split("-").map((plan: any) => plan.trim());
      }
      planes.sort((a: any, b: any) => a.precioMensual - b.precioMensual);
      this.planes = planes;
    });
  }
}