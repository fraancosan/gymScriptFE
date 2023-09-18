import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  constructor() { }

  getPlanes(): any {
    return [
      {
        title: 'BÁSICO',
        cost: 15.99,
        cardListItems: [
          'Acceso al gimnasio',
          'Horario flexible',
          'Asesoramiento básico',
          'Seguimiento de progreso'
        ]
      },
      {
        title: 'ESTÁNDAR',
        cost: 30.99,
        cardListItems: [
          'Acceso a clases grupales',
          'Asesoramiento personalizado',
          'Acceso a vestuarios premium',
          'Descuentos en suplementos'
        ]
      },
      {
        title: 'PREMIUM',
        cost: 55.99,
        cardListItems: [
          'Acceso exclusivo',
          'Entrenamiento personalizado',
          'Nutrición avanzada',
          'Clases de Boxeo'
        ]
      }
    ]
  }
}
