import { Component, Input } from '@angular/core';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css'],
})
export class CheckInComponent {
  idUser!: number; // El ID de usuario ingresado por el usuario
  usuario: any = null; // Objeto para almacenar los datos del usuario
  estado: string = '';
  situacion: string = '';
  inscripcion: any;
  errorMsg: string = '';
  isLoading = false;

  constructor(
    private bd: ConeccionService,
    private toastr: ToastrService,
  ) {}

  cargarDatos() {
    this.errorMsg = '';
    this.usuario = null;
    this.isLoading = true;
    if (!this.idUser) {
      this.isLoading = false;
      return;
    }

    this.bd.accessControl(this.idUser).subscribe({
      next: (data: any) => {
        this.usuario = data.usuario;
        this.inscripcion = data.inscripcion;
        this.situacion = data.estadoCuota ? 'Vencido' : 'Al dia!';
        this.isLoading = false;
      },
      error: (error: any) => {
        this.errorMsg = error.error.msg;
        this.toastr.error(error.error.msg, 'Error', { timeOut: 1500 });
        this.isLoading = false;
      },
    });
  }
}
