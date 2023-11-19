import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
    contraseña: ['', [Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]*$')]],
  });

  constructor (
    private bd: ConeccionService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.cambiarEditando();
    this.cargarDatos();  
  };

  get nombre() {
    return this.form.controls.nombre;
  }

  get apellido() {
    return this.form.controls.apellido;
  }

  get dni() {
    return this.form.controls.dni;
  }

  get telefono() {
    return this.form.controls.telefono;
  }

  get mail() {
    return this.form.controls.mail;
  }

  get password() {
    return this.form.controls.contraseña;
  }

  guardarDatos(){
    if (this.form.valid) {
      this.setUsuario();
      // Si no se modifico nada, no se hace nada
      // Lo averiguo bien si solo tiene la key id
      if (Object.keys(this.usuario).length == 1){
        this.toastr.error("No se modificó ningún dato");
        return;
      } else {
        this.bd.update("usuarios",this.usuario).subscribe( 
          {
            next: (data:any) => {
              this.toastr.success("Datos modificados correctamente");
              this.cambiarEditando();
              this.cargarDatos();
            },
            error: (error:any) => {
              this.cargarDatos();
            }
          }
        );
      }

    }
    this.cambiarEditando();
  }

  cancelar(){
    this.cambiarEditando();
    this.setFormulario();
  }

  editar(){
    this.cambiarEditando();
  }

  // Se debe agregar una forma de realizar desde el back
  eliminarCuenta(){
    if (confirm('¿Está seguro que desea eliminar su cuenta?\nEsta acción no se puede deshacer')) {
    }
  }

  cambiarEditando(){
    this.bloqEdicion = !this.bloqEdicion;
    this.bloqEdicion ? this.form.disable() : this.form.enable();
  }

  setFormulario(){
    this.form.setValue(
      {
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        dni: this.usuario.dni,
        telefono: this.usuario.telefono,
        mail: this.usuario.mail,
        contraseña: "",
      }
    );
  }

  setUsuario(){
    // Actualizo cada dato solo si se modifico
    if (this.usuario.nombre != this.form.value.nombre){
      this.usuario.nombre = this.form.value.nombre;
    } else {
      delete this.usuario.nombre;
    }
    if (this.usuario.apellido != this.form.value.apellido){
      this.usuario.apellido = this.form.value.apellido;
    } else {
      delete this.usuario.apellido;
    }
    if (this.usuario.dni != this.form.value.dni){
      this.usuario.dni = this.form.value.dni;
    } else {
      delete this.usuario.dni;
    }
    if (this.usuario.telefono != this.form.value.telefono){
      this.usuario.telefono = this.form.value.telefono;
    } else {
      delete this.usuario.telefono;
    }
    if (this.usuario.mail != this.form.value.mail){
      this.usuario.mail = this.form.value.mail;
    } else {
      delete this.usuario.mail;
    }
    if (this.form.value.contraseña != ""){
      this.usuario.contraseña = this.form.value.contraseña;
    } else {
      delete this.usuario.contraseña;
    }
  }

  cargarDatos(){
    this.bd.getOne("usuarios","usuario",this.idUser).subscribe((data:any) => {
      this.todoBien = true;
      delete data.rol;
      data.contraseña = "";
      this.usuario = data;
      // NO QUIERO QUE SE MODIFIQUE EL OBJETO ORIGINAL
      this.datosViejos = JSON.parse(JSON.stringify(data));
      this.setFormulario();
    });
  }
}