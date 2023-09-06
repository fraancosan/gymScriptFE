import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm=this.formBuilder.group({
    email:['pepito@gmail.com',[Validators.required, Validators.email]],
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