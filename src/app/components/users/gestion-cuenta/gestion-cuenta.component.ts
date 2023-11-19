import { Component, Input } from '@angular/core';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';

@Component({
  selector: 'app-gestion-cuenta',
  templateUrl: './gestion-cuenta.component.html',
  styleUrls: ['./gestion-cuenta.component.css']
})
export class GestionCuentaComponent {
  @Input() idUser?: number;
  todoBien: boolean = false;

  constructor (
    private bd: ConeccionService,
  ){}

  ngOnInit(): void {
    
  }
}
