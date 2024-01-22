import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import {
  faArrowRightFromBracket,
  faBars,
  faTableCellsLarge,
} from '@fortawesome/free-solid-svg-icons';
import { ConeccionService } from '../services/bd/coneccion.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  header?: string;
  tabla?: string;

  menuIcon = faBars;
  gridIcon = faTableCellsLarge;
  logoutIcon = faArrowRightFromBracket;

  nombreUser: string = '';
  apellidoUser: string = '';
  jwtHelper = new JwtHelperService();
  token: string = localStorage.getItem('token') || '';

  constructor(
    private router: Router,
    private bd: ConeccionService,
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    let sideBar = document.getElementsByClassName('sidebar');
    if (event.target.innerWidth < 1100) {
      sideBar[0].classList.add('close');
    } else {
      sideBar[0].classList.remove('close');
    }
  }

  ngOnInit(): void {
    // se pone tabla por defecto
    this.cargarDatos('Productos', 'productos');

    let tokenDecoded = this.jwtHelper.decodeToken(this.token);
    this.bd
      .getOne('usuarios', 'usuario', tokenDecoded.id)
      .subscribe((data: any) => {
        this.nombreUser = data.nombre;
        this.apellidoUser = data.apellido;
      });
  }

  closeMenu(): void {
    let sideBar = document.getElementsByClassName('sidebar');

    if (sideBar[0].classList.contains('close')) {
      sideBar[0].classList.remove('close');
    } else {
      sideBar[0].classList.add('close');
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/signIn']);
  }

  // Funcion que se encarga de redirigir a los listados correspondientes
  cargarDatos(header: string, tabla: string): void {
    if (window.innerWidth < 1100) {
      let sideBar = document.getElementsByClassName('sidebar');
      sideBar[0].classList.add('close');
    }
    this.header = header;
    this.tabla = tabla;
  }
}
