import { Component, Input } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: any;
  imgUrl = '';

  constructor(private imgServ: ImagesService) {}

  ngOnInit(): void {
    this.imgUrl = this.imgServ.alterUrl(
      this.imgServ.alterSize(this.product.img, 'medium'),
    );
  }
}
