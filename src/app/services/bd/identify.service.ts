import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdentifyService {

  constructor(){}

  identificar(tabla:string): any{
    let tipos: any = [];
    let esquema: any = [];
    let formato: any = [];
    let inpNum = {"input" : "number"};
    let inpText = {"input": "text"};
    // se identifica la tabla para saber que campos tiene y que tipos de datos son

    switch (tabla) {
      case "productos": {
        tipos = [inpNum,inpText, inpText, inpText, inpText];
        esquema = {"id":"", "nombre":"", "descripcion":"", "tipo":"", "img":""}
        break;
      }
      case "usuarios": {
        tipos = [inpNum,inpNum, inpText, inpText, inpNum, {"input": "mail"}, {"input":"password"}, {"select": ["admin", "user", "empleado"]}];
        esquema = {"id": "", "dni": "", "nombre":"", "apellido":"", "telefono":"", "mail":"", "contraseña":"", "rol":""}
        break;
      }
      case "provincias": {
        tipos = [inpNum,inpText];
        esquema = {"id": "", "nombre":""}
        break;
      }
      case "actividades": {
        tipos = [inpNum,inpText, inpText];
        esquema = {"id": "", "nombre":"", "descripcion":""}
        break;
      }
      case "planes": {
        tipos = [inpNum,inpText, inpText, inpNum];
        esquema = {"id": "", "nombre":"", "descripcion":"", "precioMensual":""}
        break;
      }
    }
    return [tipos, esquema];
  }
}