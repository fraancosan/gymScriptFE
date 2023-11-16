import { Injectable } from '@angular/core';
import { esquemaTabla } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class IdentifyService {

  constructor(){}

  identificar(tabla:string): any{
    let esquema:esquemaTabla[] = [];
    switch (tabla) {
      case "productos": {
        esquema = [
          {"key":"id", "nombre":"Id", "campo":"input","tipo": "number", "editable":false},
          {"key":"nombre","nombre":"Nombre", "campo":"input","tipo": "text", "editable":true},
          {"key":"descripcion", "nombre":"Descripcion","campo":"input","tipo": "text", "editable":true},
          {"key":"tipo", "nombre":"Tipo", "campo":"input","tipo": "text", "editable":true}, 
          {"key":"img", "nombre":"Imagen", "campo":"input","tipo": "text", "editable":true},
        ];
        break;
      }
      case "usuarios": {
        esquema = [
          {"key":"id", "nombre":"Id", "campo":"input","tipo": "number", "editable":false},
          {"key":"dni", "nombre":"Dni", "campo":"input","tipo": "number", "editable":true}, 
          {"key":"nombre", "nombre":"Nombre", "campo":"input","tipo": "text", "editable":true},
          {"key":"apellido", "nombre":"Apellido", "campo":"input","tipo": "text", "editable":true},
          {"key":"telefono", "nombre":"Telefono", "campo":"input","tipo": "number", "editable":true},
          {"key":"mail", "nombre":"Mail", "campo":"input","tipo": "mail", "editable": true}, 
          {"key":"contraseña", "nombre":"Contraseña", "campo":"input","tipo":"password", "editable":true}, 
          {"key":"rol", "nombre":"Rol", "campo":"select", "tipo":"text", "posValores": ["admin", "user", "recepcionista"], "editable": true}
        ];
        break;
      }
      case "provincias": {
        esquema = [
          {"key":"id", "nombre":"Id", "campo":"input","tipo": "number", "editable":false},
          {"key":"nombre", "nombre":"Nombre", "campo":"input","tipo": "text", "editable":true},
        ];
        break;
      }
      case "localidades": {
        esquema = [
          {"key":"id", "nombre":"Id", "campo":"input","tipo": "number", "editable":false},
          {"key":"nombre", "nombre":"Nombre", "campo":"input","tipo": "text", "editable":true},
          {"key":"codPostal", "nombre":"Codigo Postal", "campo":"input","tipo": "text", "editable":true},
          {"key":"idProvincia", "nombre":"Id Provincia", "campo":"input","tipo": "number", "editable":true},
        ];
        break;
      }
      case "actividades": {
        esquema = [
          {"key":"id", "nombre":"Id", "campo":"input","tipo": "number", "editable":false},
          {"key":"nombre", "nombre":"Nombre", "campo":"input","tipo": "text", "editable":true},
          {"key":"descripcion", "nombre":"Descripcion", "campo":"input","tipo": "text", "editable":true},
        ];
        break;
      }
      case "planes": {
        esquema = [
          {"key":"id", "nombre":"Id", "campo":"input","tipo": "number", "editable":false},
          {"key":"nombre", "nombre":"Nombre", "campo":"input","tipo": "text", "editable":true},
          {"key":"descripcion", "nombre":"Descripcion", "campo":"input","tipo": "text", "editable":true},
          {"key":"precioMensual", "nombre":"Precio Mensual", "campo":"input","tipo": "number", "editable":true},
        ];
        break;
      }
      // Ver bien tema inscripciones xq capaz no vaya aca
      case "inscripciones": {
        esquema = [
          {"key":"id", "nombre":"Id", "campo":"input","tipo": "number", "editable":false},
          {"key":"idUsuario", "nombre":"Id Usuario", "campo":"input","tipo": "number", "editable":false},
          {"key":"idPlan", "nombre":"Id Plan", "campo":"input","tipo": "number", "editable":false},
          {"key":"fechaAlta", "nombre":"Fecha Alta", "campo": "input","tipo": "date", "editable": false},
          {"key":"fechaBaja", "nombre":"Fecha Baja", "campo": "input","tipo": "date", "editable": true}, // Ver bien xq es editable la primera vez no mas
          {"key":"idSede", "nombre":"Id Sede", "campo":"input","tipo": "number", "editable":false},
        ];
        break;
      }
      case "plan-actividades": {
        esquema = [
          {"key":"id", "nombre":"Id", "campo":"input","tipo": "number", "editable":false},
          {"key":"idPlan", "nombre":"Id Plan", "campo":"input","tipo": "number", "editable":true},
          {"key":"idActividad", "nombre":"Id Actividad", "campo":"input","tipo": "number", "editable":true},
        ];
        break;
      }
      case "sedes": {
        esquema = [
          {"key":"id", "nombre":"Id", "campo":"input","tipo": "number", "editable":false},
          {"key":"direccion", "nombre":"Direccion", "campo":"input","tipo": "text", "editable":true},
          {"key":"idLocalidad", "nombre":"Id Localidad", "campo":"input","tipo": "number", "editable":true},
        ];
        break;
      }
    }
    return esquema;
  }
}