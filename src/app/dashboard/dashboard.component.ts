import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/auth/login.service';
import { userLogin } from '../services/auth/userLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  // userData?: userLogin;
  userLoginOn?: boolean;
  header?: string;
  tabla?: string;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.currentUserData.subscribe({
      next: (data) => {
        // this.userData = userData;
        console.log(data);
      },
    });
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });

    // se pone tabla por defecto
    this.header = "Productos";
    this.tabla = "productos";
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/signIn']);
  }

  provincias(): void {
    this.header = "Provincias";
    this.tabla = "provincias";
  }

  productos(): void {
    this.header = "Productos";
    this.tabla = "productos";
  }
}