import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdentifyService {

  constructor(){}

  identificar(tabla:string): any{
    let tipos: any = [];
    let esquema: any = [];
    if (tabla == "articulos") {
      // se envian tipos de datos para el formulario, se ignoran los ID
      tipos = ["number","text", "text", "text", "text"];
      esquema = {}
    }
    else if (tabla == "usuarios") {
      // se envian tipos de datos para el formulario, se ignoran los ID
      tipos = ["number","number", "text", "text", "tel", "email"];
      esquema = {}
    }
    else if (tabla == "provincias") {
      tipos = ["number","text"];
      esquema = {"id": "", "nombre":""}
    }
    return [tipos, esquema];
  }
}