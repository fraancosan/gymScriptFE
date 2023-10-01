import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service'; // Import the loginService
import { LoginRequest } from 'src/app/services/auth/loginRequest';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginError:String ='';
  loginForm = this.formBuilder.group({
    email:['',[Validators.required, Validators.email]],
    password: ['',Validators.required],
  })
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }


  get email(){
    return this.loginForm.controls.email;
  }

  get password()
  {
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
      console.log("Logueado");
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: data => {
          console.log(data);
          // this.router.navigateByUrl("/home");
        },
        error: error => {
          console.log(error);
          this.loginError = error;
        },
        complete: () => {
          console.log('Login complete')
          // this.router.navigateByUrl("/home");
          this.loginForm.reset();
        }
          
      })

      }
    else{
      this.loginForm.markAllAsTouched();
      alert("Datos erroneos");
    }
  }

}
