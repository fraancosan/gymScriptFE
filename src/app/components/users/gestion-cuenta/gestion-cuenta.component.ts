import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  datosViejos: any = {};
  bloqEdicion: boolean = false;

  // se implementa el formulario para editar los datos
  form = this.formBuilder.group({
    nombre: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    dni: [
      0,
      [
        Validators.required,
        Validators.min(1), 
        Validators.max(100000000),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    telefono: [
      "",
      [
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(5),
        Validators.maxLength(15),
      ],
    ],
    mail: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    contraseña: ['', Validators.required],
  });

  constructor (
    private bd: ConeccionService,
    private formBuilder: FormBuilder,
  ){}

  ngOnInit(): void {
    this.cambiarEditando();
    this.bd.getOne("usuarios","usuario",this.idUser).subscribe((data:any) => {
      this.todoBien = true;
      delete data.rol;
      data.contraseña = "";
      this.usuario = data;
      // NO QUIERO QUE SE MODIFIQUE EL OBJETO ORIGINAL
      this.datosViejos = JSON.parse(JSON.stringify(data));

      this.form.setValue(
        {
          nombre: data.nombre,
          apellido: data.apellido,
          dni: data.dni,
          telefono: data.telefono,
          mail: data.mail,
          contraseña: "",
        }
      );
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
    this.bloqEdicion ? this.form.disable() : this.form.enable();
  }
}