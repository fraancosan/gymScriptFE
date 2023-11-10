import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdentifyService {

  constructor(){}

  identificar(tabla:string): any{
    let tipos: any = [];
    let esquema: any = [];
    // se identifica la tabla para saber que campos tiene y que tipos de datos son
    if (tabla == "productos") {
      tipos = ["number","text", "text", "text", "text"];
      esquema = {"id":"", "nombre":"", "descripcion":"", "tipo":"", "img":""}
    }
    else if (tabla == "usuarios") {
      tipos = ["number","number", "text", "text", "number", "text", "text", "text"];
      esquema = {"id": "", "dni": "", "nombre":"", "apellido":"", "telefono":"", "mail":"", "contraseña":"", "rol":""}
    }
    else if (tabla == "provincias") {
      tipos = ["number","text"];
      esquema = {"id": "", "nombre":""}
    }
    else if (tabla == "actividades") {
      tipos = ["number","text", "text"];
      esquema = {"id": "", "nombre":"", "descripcion":""}
    }
    else if (tabla == "planes") {
      tipos = ["number","text", "text", "number"];
      esquema = {"id": "", "nombre":"", "descripcion":"", "precioMensual":""}
    }
    return [tipos, esquema];
  }
}