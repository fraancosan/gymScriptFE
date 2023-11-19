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
      let datos = this.datosAEditar();
      // Si no se modifico nada, no se hace nada
      // Lo averiguo bien si solo tiene la key id
      if (Object.keys(datos).length == 1){
        this.toastr.error("No se modificó ningún dato");
        this.cancelar();
      } else {
        this.bd.update("usuarios",datos).subscribe( 
          {
            next: (data:any) => {
              this.toastr.success("Datos modificados correctamente");
              this.cambiarEditando();
              this.cargarDatos();
            },
            error: (error:any) => {
              this.cancelar();
            }
          }
        );
      }
    }
  }

  cancelar(){
    this.cambiarEditando();
    this.setFormulario(this.usuario);
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

  setFormulario(json: any){
    this.form.setValue(
      {
        nombre: json.nombre,
        apellido: json.apellido,
        dni: json.dni,
        telefono: json.telefono,
        mail: json.mail,
        contraseña: "",
      }
    );
  }

  getFormulario(): any{
    return {
      "id": this.idUser,
      "nombre": this.nombre.value,
      "apellido": this.apellido.value,
      "dni": this.dni.value,
      "telefono": this.telefono.value,
      "mail": this.mail.value,
      "contraseña": this.password.value,
    }
  }

  datosAEditar(){
    let datos = this.getFormulario();
    for (let key in datos){
      if (key == "id"){
        continue
      }
      if (datos[key] == this.usuario[key]){
        delete datos[key];
      } else {
        continue
      }
    }
    return datos;
  }

  cargarDatos(){
    this.bd.getOne("usuarios","usuario",this.idUser).subscribe((data:any) => {
      this.todoBien = true;
      delete data.rol;
      data.contraseña = "";
      this.usuario = data;
      this.setFormulario(this.usuario);
    });
  }
}