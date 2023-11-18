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
  inscripcion: any;
  estado: string = "";
  idUser: number = 0;
  irA: string = 'cuotas';

  constructor (
    private bd: ConeccionService,
  ){}

  ngOnInit(): void {
    let token = localStorage.getItem('token')!;
    let tokenDecoded = this.jwtHelper.decodeToken(token);
    this.idUser = tokenDecoded.id;
    this.bd.getInscripcionActiva(this.idUser).subscribe({
      next: (data: any) => {
        this.inscripcion = data[0];
        this.estado = 'inscripto';
      },
      error: error => {
        this.estado = 'noInscripto';
      }
    });
  }

  queHacer(orden: string){
    this.irA = orden;
  }
}