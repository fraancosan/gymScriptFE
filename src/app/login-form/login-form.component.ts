import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service'; // Import the loginService
import { LoginRequest } from 'src/app/interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
import { JwtAuthService } from '../services/auth/jwt-auth.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginError: String = '';
  loading: boolean = false;
  loginForm = this.formBuilder.group({
    mail: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    contraseña: ['', Validators.required],
  });
  token: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService,
    private jwtAuth: JwtAuthService
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.controls.mail;
  }

  get password() {
    return this.loginForm.controls.contraseña;
  }

  login() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (data) => {
          localStorage.setItem('token', data);
          this.token = data;
        },
        error: (error) => {
          this.loading = false;
          this.toastr.error(error, 'Error');
        },
        complete: () => {
          this.loading = false;
          let tokenDecoded = this.jwtAuth.decodeToken(this.token);
          if (tokenDecoded.rol == 'admin') {
            this.router.navigateByUrl('/dashboard');
            this.loginForm.reset();
          } else {
            //Deberia mandar a inscripcion
            this.navToUser();
            this.loginForm.reset();
          }
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.toastr.error('Los datos ingresados presentan errores', 'Error');
    }
  }

  navToUser() {
    const params = this.router.parseUrl(this.router.url).queryParams;
    if (params ? params['plan'] : false) {
      this.router.navigate(['/user'], {
        state: { plan: params!['plan'] },
        queryParams: { plan: params!['plan'] },
      });
    } else {
      this.router.navigate(['/user']);
    }
  }
}
