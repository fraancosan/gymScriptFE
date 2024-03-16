import { Component, Input } from '@angular/core';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})

export class CheckInComponent {
  idUser!: number; // El ID de usuario ingresado por el usuario
  todoBien: boolean = false;
  usuario: any = {}; // Objeto para almacenar los datos del usuario
  estado: string = '';
  situacion: string = '';
  inscripcion: any;


  constructor(private bd: ConeccionService, private toastr: ToastrService) { }

  cargarDatos() {
    if (!this.idUser) {
      return;
    }
  
    this.bd.getOne('usuarios', 'usuario', this.idUser).subscribe((data: any) => {
      this.usuario = data;
      this.todoBien = true;
  
      this.bd.getInscripcionActiva(this.idUser).subscribe({
        next: (data: any) => {
          this.inscripcion = data[0];
          this.estado = 'inscripto';
  
          this.bd.getVencimientoCuota(this.inscripcion.id).subscribe({
            next: (data: any) => {
              this.situacion = data ? 'Vencido' : 'Al dia!';
            },
            error: (error: any) => {
              this.toastr.error(error.error.msg, 'Error', { timeOut: 1500 });
            },
          });
        },
        error: (error) => {
          this.estado = 'noInscripto';
        },
      });
    }, error => {
      console.error('Error al cargar los datos del usuario:', error);
      this.todoBien = false;
    });
    
  }


}