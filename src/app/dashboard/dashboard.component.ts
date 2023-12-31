import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/auth/login.service';
import { userLogin } from '../interfaces/interfaces';
import { Router } from '@angular/router';
import {faArrowRightFromBracket, faBars, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons';
import { ConeccionService } from '../services/bd/coneccion.service';
import { JwtHelperService } from '@auth0/angular-jwt';

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

  menuIcon = faBars;
  gridIcon = faTableCellsLarge;
  logoutIcon = faArrowRightFromBracket;
  
  nombreUser: string = "";
  apellidoUser: string = "";
  jwtHelper = new JwtHelperService();
  token: string = localStorage.getItem('token') || '';

  constructor(private loginService: LoginService, private router: Router, private bd:ConeccionService) {}

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
    this.cargarDatos("Productos", "productos");

    let tokenDecoded = this.jwtHelper.decodeToken(this.token);
    this.bd.getOne("usuarios", "usuario", tokenDecoded.id).subscribe((data: any) => {
      this.nombreUser =  data.nombre;
      this.apellidoUser = data.apellido;
    });
    
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/signIn']);
  }

  // Funcion que se encarga de redirigir a los listados correspondientes
  cargarDatos(header: string, tabla: string): void{
    this.header = header;
    this.tabla = tabla;
  }
}