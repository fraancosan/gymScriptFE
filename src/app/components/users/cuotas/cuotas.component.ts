import { Component, Input, OnInit } from '@angular/core';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cuotas',
  templateUrl: './cuotas.component.html',
  styleUrls: ['./cuotas.component.css'],
})
export class CuotasComponent implements OnInit {
  @Input() inscripcion: any;
  estado: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private bd: ConeccionService,
  ) {}

  ngOnInit(): void {
    this.bd.getVencimientoCuota(this.inscripcion.id).subscribe({
      next: (data: any) => {
        this.estado = data ? 'Vencido' : 'Al dia!';
      },
      error: (error: any) => {
        this.toastr.error(error.error.msg, 'Error', { timeOut: 1500 });
      },
    });
  }

  pay() {
    this.loading = true;
    this.bd.pagarCuota(this.inscripcion.id).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          this.loading = false;
          window.location.reload(); // no conveniente, buscar alternativa
        }, 300);
      },
      error: (error: any) => {
        this.loading = false;
        this.toastr.error(error.error.msg, 'Error', { timeOut: 1500 });
      },
    });
  }
}
