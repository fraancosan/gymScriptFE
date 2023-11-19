import { Component, Input, OnInit } from '@angular/core';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cuotas',
  templateUrl: './cuotas.component.html',
  styleUrls: ['./cuotas.component.css']
})
export class CuotasComponent implements OnInit {
  @Input() inscripcion: any;
  fechaPago?: string ;
  importe?: number;
  fechaVenc: string = '';
  estado: string = '';
  disabledButton: boolean = true;
  loading: boolean = false;

  constructor(private toastr: ToastrService, private bd:ConeccionService) { }

  ngOnInit(): void {
    this.fechaPago = this.inscripcion.cuota[0].fechaPago;
    this.fechaVenc = this.inscripcion.cuota[0].fechaVenc;
    this.importe = this.inscripcion.cuota[0].importe;

    const fechaComparar = new Date(this.fechaVenc);
    const fechaHoy = new Date();
    if(fechaComparar < fechaHoy){
      this.estado = 'Vencido';
    }else{
      this.estado = 'Al dia!';
    }
    this.updateButtonState();
    }

    pagar(){
      this.loading = true;
      this.bd.pagarCuota( this.inscripcion.id).subscribe({
        next: (data: any) => {
          setTimeout(() => {
            this.loading = false;
            window.location.reload();
          }, 300);
        },
        error: (error: any) => {
          this.loading = false;
          this.toastr.error(error.error.msg, "Error", {timeOut: 1500});
        }
        
      });
    }
    
    updateButtonState() {
      this.disabledButton = (this.estado == 'Al dia!');
    }
}
