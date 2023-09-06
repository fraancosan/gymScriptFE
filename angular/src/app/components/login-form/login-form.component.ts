import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
    loginForm = this.formBuilder.group({
    email:['',[Validators.required, Validators.email]],
    password: ['',Validators.required],
  })
  constructor(private formBuilder:FormBuilder, private router:Router) { }

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
      this.router.navigateByUrl("/home");
      this.loginForm.reset();
    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Datos erroneos");
    }
  }

}
