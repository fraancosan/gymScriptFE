import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';

@Component({
  selector: 'app-gestion-inscripcion',
  templateUrl: './gestion-inscripcion.component.html',
  styleUrls: ['./gestion-inscripcion.component.css']
})
export class GestionInscripcionComponent {
  @Input() inscripcion: any = {};
  @Output() sinInscripcion = new EventEmitter<boolean>();
  todoBien: boolean = false;

  descripcionPlan: string = '';
  localidad: any = {};
  fecha: any;

  constructor(
    private bd: ConeccionService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.descripcionPlan = this.inscripcion.plan.descripcion.split('-')

    this.bd.getOne('localidades', "Localidad", this.inscripcion.sede.idLocalidad).subscribe((data: any) => {this.localidad = data; this.todoBien = true});

    let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    this.fecha = new Date(this.inscripcion.fechaAlta + 'T00:00:00');
    this.fecha = this.fecha.getDate() + ' de ' + meses[this.fecha.getMonth()] + ' de ' + this.fecha.getFullYear();
  }

  darDeBaja() {
    // Primero se pone un mensaje de confirmación
    if (confirm('¿Está seguro que desea dar de baja esta inscripción?')) {
      // Json a enviar
      let baja = {
        "id": this.inscripcion.id,
        "fechaBaja": new Date(),
      }
      this.bd.update('inscripciones', baja).subscribe((data: any) => {this.router.navigate(["/home"])});
    }
  }

  cambiarPlan() {
    // Primero se pone un mensaje de confirmación
    if (confirm('¿Está seguro que desea cambiar el plan o la sede? Se le volvera a cobrar la inscripción')) {
      // Json a enviar
      let baja = {
        "id": this.inscripcion.id,
        "fechaBaja": new Date(),
      }
      this.bd.update('inscripciones', baja).subscribe((data: any) => {this.sinInscripcion.emit(true)});
    }
  }
}