import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  jwtHelper = new JwtHelperService();
  inscripcion = {}

  constructor (
    private bd: ConeccionService,
  ){}

  ngOnInit(): void {
    let token = localStorage.getItem('token')!;
    let tokenDecoded = this.jwtHelper.decodeToken(token);
    this.bd.getInscripcionActiva(tokenDecoded.id).subscribe(data => {console.log(data)});
  }
}