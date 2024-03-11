import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-inscribirse',
  templateUrl: './inscribirse.component.html',
  styleUrls: ['./inscribirse.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.3s', style({ height: '*', opacity: 1 })),
      ]),
    ]),
  ],
})
export class InscribirseComponent {
  @Input() idUser!: number;

  @Output() sinInscripcion = new EventEmitter<boolean>();

  planes: any;
  sedes: any;
  sedesFiltered: any;
  localidades: any;
  idPlanSelected: string = '';
  idLocalidadSelected: number = 0;
  idSedeSelected: number = 0;
  disabledButton: boolean = true;
  loading: boolean = false;

  constructor(
    private bd: ConeccionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    let params = this.router.parseUrl(this.router.url).queryParams;
    this.idPlanSelected = params ? params['plan'] : '';

    this.bd.getAll('planes', 'planes').subscribe((planes: any) => {
      for (let i = 0; i < planes.length; i++) {
        planes[i].descripcion = planes[i].descripcion
          .split('-')
          .map((plan: any) => plan.trim());
      }
      planes.sort((a: any, b: any) => a.precioMensual - b.precioMensual);
      this.planes = planes;
    });

    this.bd.getAll('sedes', 'sedes').subscribe((sedes: any) => {
      this.sedes = sedes;
      this.localidades = this.getLocalidades(sedes);
      this.updateSedes();
    });
  }

  getLocalidades(sedes: any) {
    const localidades = sedes.reduce((acc: any[], sede: any) => {
      if (!acc.find((localidad: any) => localidad.id === sede.idLocalidad)) {
        acc.push({
          id: sede.idLocalidad,
          nombre: sede.localidad.nombre,
        });
      }
      return acc;
    }, []);
    return localidades;
  }

  updateSedes() {
    this.sedesFiltered = this.sedes.filter(
      (sede: any) => sede.idLocalidad == this.idLocalidadSelected,
    );
    this.idSedeSelected = 0;
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
    this.disabledButton =
      !this.idPlanSelected || !this.idLocalidadSelected || !this.idSedeSelected;
  }
}
