import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/interfaces';
import { ConeccionService } from '../services/bd/coneccion.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  products?: any[];
  categories?: string[];
  filteredProducts?: Product[] = this.products;
  filterProduct = '';

  constructor(private bd: ConeccionService) {}

  ngOnInit(): void {
    this.bd.getAll('productos', 'productos').subscribe((data: any[]) => {
      this.products = data;
      this.filteredProducts = this.products;

      // Extraigo los tipos(categorias) de los productos
      this.categories = [
        ...new Set(this.products.map((product) => product.tipo)),
      ];
      // Agrego la categoria 'Todos los productos'
      this.categories.unshift('Todos los productos');
    });
  }

  //Ver de hacerlo con consultas para que sea mas rapido
  onCategorySelected(category: string): void {
    if (category === 'Todos los productos') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products?.filter(
        (product) => product.tipo === category,
      );
    }
  }
}
