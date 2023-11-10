import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: any; // Asegúrate de definir una interfaz o modelo específico para los productos

  // Agrega la lógica de presentación de la tarjeta del producto aquí
}

