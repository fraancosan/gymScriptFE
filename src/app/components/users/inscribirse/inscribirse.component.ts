import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscribirse',
  templateUrl: './inscribirse.component.html',
  styleUrls: ['./inscribirse.component.css'],
})
export class InscribirseComponent {
  @Input() idUser!: number;

  @Output() sinInscripcion = new EventEmitter<boolean>();

  planes: any;
  sedes: any;
  idPlanSelected: string = '';
  idSedeSelected: number = 0;
  disabledButton: boolean = true;
  loading: boolean = false;

  constructor(
    private bd: ConeccionService,
    private router: Router,
  ) {
    bd.getAll('planes', 'planes').subscribe((planes: any) => {
      for (let i = 0; i < planes.length; i++) {
        planes[i].descripcion = planes[i].descripcion
          .split('-')
          .map((plan: any) => plan.trim());
      }
      planes.sort((a: any, b: any) => a.precioMensual - b.precioMensual);
      this.planes = planes;
    });

    bd.getAll('sedes', 'sedes').subscribe((sedes: any) => {
      this.sedes = sedes;
    });
  }

  createInscription(idPlan: string, idSede: number) {
    this.loading = true;
    this.bd
      .create('inscripciones', {
        idUsuario: this.idUser,
        idPlan: Number(idPlan),
        idSede: Number(idSede),
      })
      .subscribe({
        next: (inscripcion: any) => {
          setTimeout(() => {
            this.loading = false;
            this.sinInscripcion.emit(false);
          }, 300);
        },
        error: (error: any) => {
          this.loading = false;
        },
      });
  }

  updateButtonState() {
    this.disabledButton = !this.idPlanSelected || !this.idSedeSelected;
  }

  ngOnInit(): void {
    let params = this.router.parseUrl(this.router.url).queryParams;
    this.idPlanSelected = params ? params['plan'] : '';
  }
}
