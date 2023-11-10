import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import { Product } from '../interfaces/interfaces';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  products?: any[]; 
  categories?: string[];
  filteredProducts?: Product[] = this.products;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      this.filteredProducts = this.products;
    
    // Extraigo los tipos de los productos
    this.categories = [...new Set(this.products.map(product => product.tipo))];
    // Agrego la categoria 'Todos los productos'
    this.categories.unshift('Todos los productos');
    
    });
  }

  //Ver de hacerlo con consultas para que sea mas rapido
  onCategorySelected(category: string): void {

    if (category === 'Todos los productos') {
      this.filteredProducts = this.products;
    } else {
    this.filteredProducts = this.products?.filter(product => product.tipo === category);
    }
}

}


