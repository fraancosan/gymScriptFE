import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdentifyService {

  constructor(){}

  identificar(tabla:string): any{
    let tipos: any = [];
    if (tabla == "articulos") {
      // se envian tipos de datos para el formulario, se ignoran los ID
      tipos = ["text", "text", "text", "text"]
    }
    else if (tabla == "clientes") {
      // se envian tipos de datos para el formulario, se ignoran los ID
      tipos = ["number", "text", "text", "tel", "email"]
    }
    return tipos;
  }
}