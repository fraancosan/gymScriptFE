import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  private jwtHelper = new JwtHelperService();
  inscripcion = {};
  estado: string = "";
  idUser: number = 0;

  constructor (
    private bd: ConeccionService,
  ){}

  ngOnInit(): void {
    let token = localStorage.getItem('token')!;
    let tokenDecoded = this.jwtHelper.decodeToken(token);
    this.idUser = tokenDecoded.id;
    this.bd.getInscripcionActiva(this.idUser).subscribe({
      next: data => {
        this.inscripcion = data;
        this.estado = 'inscripto';
      },
      error: error => {
        this.estado = 'noInscripto';
      }
    });
  }
}