import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  /* Array de Objetos para almacenar la diferente info de cada plan*/
    cards = [
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
  ];
}
