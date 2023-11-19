import { Component, Input } from '@angular/core';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';

@Component({
  selector: 'app-gestion-cuenta',
  templateUrl: './gestion-cuenta.component.html',
  styleUrls: ['./gestion-cuenta.component.css']
})
export class GestionCuentaComponent {
  @Input() idUser!: number;
  todoBien: boolean = false;
  usuario: any = {};
  bloqEdicion: boolean = true;

  constructor (
    private bd: ConeccionService,
  ){}

  ngOnInit(): void {
    this.bd.getOne("usuarios","usuario",this.idUser).subscribe((data:any) => {
      this.todoBien = true;
      delete data.rol;
      data.contraseña = "";
      this.usuario = data;
    }
  )};

  guardarDatos(){
    this.cambiarEditando();
  }

  cancelar(){
    this.cambiarEditando();
  }

  editar(){
    this.cambiarEditando();
  }

  eliminarCuenta(){
    if (confirm('¿Está seguro que desea eliminar su cuenta?\nEsta acción no se puede deshacer')) {
    }
  }

  cambiarEditando(){
    this.bloqEdicion = !this.bloqEdicion;
  }
}