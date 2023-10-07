import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdentifyService {

  constructor() { }

  identificar(tabla:string): any {
    let articulos: any = [];
    let tipos: any = [];
    if (tabla == "articulos") {
      articulos = [
        {id: 1, nombre: 'Monster', descripcion: 'Bebida energizante', tipo: 'Bebida'},
        {id: 2, nombre: 'Protein', descripcion: 'Proteina', tipo: 'Suplemento'},
        {id: 3, nombre: 'Bcaa', descripcion: 'Bcaa', tipo: 'Suplemento'},
        {id: 4, nombre: 'Cafe', descripcion: 'Cafe', tipo: 'Bebida'},
        {id: 5, nombre: 'Coca', descripcion: 'Coca', tipo: 'Bebida'},
        {id: 6, nombre: 'Fernet', descripcion: 'Fernet', tipo: 'Bebida'},
        {id: 7, nombre: 'Vodka', descripcion: 'Vodka', tipo: 'Bebida'},
        {id: 8, nombre: 'Whisky', descripcion: 'Whisky', tipo: 'Bebida'},
        {id: 9, nombre: 'Coca', descripcion: 'Coca', tipo: 'Polvo'},
      ],
      // se envian tipos de datos para el formulario, se ignoran los ID
      tipos = ["text", "text", "text"]
    }
    else if (tabla == "clientes") {
      articulos = [
        {id: 1,dni: 44615316, nombre: 'Juan', apellido: 'Perez', telefono: 3416964996, correo: 'aeae@gmail.com'},
        {id: 2,dni: 44615310, nombre: 'Pedro', apellido: 'Gomez', telefono: 3416964999, correo: 'eeeeee@gmail.com'},
        {id: 3,dni: 44615916, nombre: 'Maria', apellido: 'Lopez', telefono: 3416964996, correo: 'rrrrrr@gmail.com'},
        {id: 4,dni: 44615451, nombre: 'Jose', apellido: 'Garcia', telefono: 3416964996, correo: 'tttttt@gmail.com'},
        {id: 5,dni: 44615724, nombre: 'Juan', apellido: 'Perez', telefono: 3416964996, correo: 'aeae@gmail.com'},
        {id: 6,dni: 44117319, nombre: 'Pedro', apellido: 'Gomez', telefono: 3416964996, correo: 'eeeeee@gmail.com'},
      ],
      // se envian tipos de datos para el formulario, se ignoran los ID
      tipos = ["number", "text", "text", "tel", "email"]
    }
    
    return [articulos, tipos]
  }
}