import { Component } from '@angular/core';
import { JwtAuthService } from '../services/auth/jwt-auth.service';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  inscripcion: any;
  estado: string = '';
  idUser: number = 0;
  irA: string = 'cuotas';

  constructor(private bd: ConeccionService, private jwtAuth: JwtAuthService ) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token')!;
    let tokenDecoded = this.jwtAuth.decodeToken(token);
    this.idUser = tokenDecoded.id;
    this.obtenerInscripcionActiva();
  }

  obtenerInscripcionActiva() {
    this.bd.getInscripcionActiva(this.idUser).subscribe({
      next: (data: any) => {
        this.inscripcion = data[0];
        this.estado = 'inscripto';
      },
      error: (error) => {
        this.estado = 'noInscripto';
      },
    });
  }

  onCloseSidebar(event: boolean) {
    let content = document.getElementsByTagName('main');
    if (event) {
      content[0].classList.remove('close');
    } else {
      content[0].classList.add('close');
    }
  }

  queHacer(orden: string) {
    this.irA = orden;
  }

  cambiarEstado(estado: boolean) {
    if (estado) {
      this.estado = 'noInscripto';
    } else {
      this.estado = 'inscripto';
      this.obtenerInscripcionActiva();
    }
  }
}
