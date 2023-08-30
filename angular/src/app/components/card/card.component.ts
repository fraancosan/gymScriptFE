import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() tituloFront: string = '';
  @Input() contenidoFront: string = '';
  @Input() tituloBack: string = '';
  @Input() contenidoBack1: string = '';
  @Input() contenidoBack2: string = '';
  @Input() contenidoBack3: string = '';
  @Input() contenidoBack4: string = '';
}
