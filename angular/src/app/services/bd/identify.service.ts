import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdentifyService {

  constructor() { }

  identificar(tabla:string): any {
    let articulos: any = [];
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
      ]
    }
    else if (tabla == "clientes") {
      articulos = [
        {dni: 1, nombre: 'Juan', apellido: 'Perez', telefono: 123456789, correo: 'aeae'},
        {dni: 2, nombre: 'Pedro', apellido: 'Gomez', telefono: 123456789, correo: 'eeeeee'},
      ]
    }
        
    return articulos;
  }
}