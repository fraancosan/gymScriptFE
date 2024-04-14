import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cuotas',
  templateUrl: './cuotas.component.html',
  styleUrls: ['./cuotas.component.css'],
})
export class CuotasComponent {
  @Input() inscripcion: any;
  estado: string = 'Cargando...';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private bd: ConeccionService,
  ) {}

  ngOnChanges(): void {
    this.getVencimiento();
  }

  getVencimiento() {
    this.loading = true;
    this.bd.getVencimientoCuota(this.inscripcion.id).subscribe({
      next: (data: any) => {
        this.estado = data ? 'Vencido' : 'Al dia!';
        this.loading = false;
      },
      error: (error: any) => {
        this.toastr.error(error.error.msg, 'Error', { timeOut: 1500 });
        this.loading = false;
      },
    });
  }

  pay() {
    this.loading = true;
    this.bd.pagarCuota(this.inscripcion.id).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          this.loading = false;
          this.getUltimaCuota();
          this.estado = 'Al dia!';
        }, 300);
      },
      error: (error: any) => {
        this.loading = false;
      },
    });
  }

  getUltimaCuota() {
    this.bd.getUltimaCuota(this.inscripcion.id).subscribe((data) => {
      this.inscripcion.cuota = data;
      console.log(data);
    });
  }
}
