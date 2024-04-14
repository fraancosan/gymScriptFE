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
  sortOrder = 'asc';

  constructor(private bd: ConeccionService) {}

  ngOnInit(): void {
    this.bd.getAll('productos', 'productos').subscribe((data: any[]) => {
      this.products = data;
      this.filteredProducts = this.products;

      this.categories = [
        ...new Set(this.products.map((product) => product.tipo)),
      ];

      this.categories.unshift('Todos los productos');
      this.onSortOrderChanged();
    });
  }

  onCategorySelected(category: string): void {
    if (category === 'Todos los productos') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products?.filter(
        (product) => product.tipo === category,
      );
    }
  }

  onSortOrderChanged() {
    if (this.filteredProducts) {
      if (this.sortOrder === 'asc') {
        this.filteredProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
      } else {
        this.filteredProducts.sort((a, b) => b.nombre.localeCompare(a.nombre));
      }
    }
  }
}
