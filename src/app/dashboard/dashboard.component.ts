import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import {
  faArrowRightFromBracket,
  faBars,
  faBasketShopping,
  faCalendarDays,
  faCity,
  faClipboard,
  faFileLines,
  faGlobe,
  faLocationDot,
  faPeoplePulling,
  faPersonRunning,
  faTableCellsLarge,
  faUser,
  faUserCheck,
} from '@fortawesome/free-solid-svg-icons';
import { ConeccionService } from '../services/bd/coneccion.service';
import { JwtAuthService } from '../services/auth/jwt-auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  header?: string;
  tabla?: string;

  mostrarCheckIn = false;
  mostrarListados = true;

  menuIcon = faBars;
  gridIcon = faTableCellsLarge;
  checkinIcon = faUserCheck;
  productoIcon = faBasketShopping;
  provinciaIcon = faGlobe;
  localidadIcon = faCity;
  actividadesIcon = faPersonRunning;
  planIcon = faFileLines;
  userIcon = faUser;
  inscripcionIcon = faClipboard;
  sedeIcon = faLocationDot;
  entrenadorIcon = faPeoplePulling;
  horarioIcon = faCalendarDays;
  logoutIcon = faArrowRightFromBracket;

  closed = false;

  nombreUser: string = '';
  apellidoUser: string = '';
  token: string = this.localStorageService.getItem('token') || '';

  constructor(
    private router: Router,
    private bd: ConeccionService,
    private jwtAuth: JwtAuthService,
    private localStorageService: LocalStorageService,
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth < 1100) {
      this.closed = true;
    } else {
      this.closed = false;
    }
  }

  ngOnInit(): void {
    // se pone tabla por defecto
    this.cargarDatos('Productos', 'productos');

    let tokenDecoded = this.jwtAuth.decodeToken(this.token);
    this.bd
      .getOne('usuarios', 'usuario', tokenDecoded.id)
      .subscribe((data: any) => {
        this.nombreUser = data.nombre;
        this.apellidoUser = data.apellido;
      });
  }

  closeMenu(): void {
    this.closed = !this.closed;
  }

  logout(): void {
    this.localStorageService.removeItem('token');
    this.router.navigate(['/signIn']);
  }

  cargarDatos(header: string, tabla: string): void {
    if (window.innerWidth < 1100) {
      this.closed = true;
    }
    this.header = header;
    this.tabla = tabla;
  }

  toggleCheckIn() {
    this.mostrarCheckIn = !this.mostrarCheckIn;
    this.mostrarListados = !this.mostrarCheckIn;
  }

  toggleListado() {
    this.mostrarCheckIn = false;
    this.mostrarListados = true;
  }
}
