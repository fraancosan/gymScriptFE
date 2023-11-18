import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { ToastrService } from 'ngx-toastr';
import { Usuarios } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  registerError: String = '';
  loading: boolean = false;
  registerForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, // private registerService: RegisterService
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  get nombre() {
    return this.registerForm.controls.nombre;
  }

  get apellido() {
    return this.registerForm.controls.apellido;
  }

  get dni() {
    return this.registerForm.controls.dni;
  }

  get telefono() {
    return this.registerForm.controls.telefono;
  }

  get mail() {
    return this.registerForm.controls.mail;
  }

  get password() {
    return this.registerForm.controls.contraseña;
  }

  register() {
    if (this.registerForm.valid) {
      this.loading = true;
      console.log(this.registerForm.value as Usuarios);
      this.loginService.register(this.registerForm.value as Usuarios).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (error) => {
          console.log(error);
          this.loading = false;
          this.toastr.error(error, 'Error');
        },
        complete: () => {
          this.toastr.success('Usuario registrado con éxito', 'Registro');
          this.loading = false;
          this.router.navigateByUrl('/signIn');
          this.registerForm.reset();
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
      this.toastr.error('Los datos ingresados presentan errores', 'Error');
    }
  }
}
