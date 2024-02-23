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
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private bd: ConeccionService) {}

  ngOnInit(): void {
    this.bd.getAll('productos', 'productos').subscribe((data: any[]) => {
      this.products = data;
      this.filteredProducts = this.products;

      
      this.categories = [
        ...new Set(this.products.map((product) => product.tipo)),
      ];
      
      this.categories.unshift('Todos los productos');
    });
  }

    sortProducts(): void {
    if (this.filteredProducts) {
      this.filteredProducts.sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a.nombre.localeCompare(b.nombre);
        } else {
          return b.nombre.localeCompare(a.nombre);
        }
      });
    }
  }

  
  onCategorySelected(category: string): void {
    if (category === 'Todos los productos') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products?.filter(
        (product) => product.tipo === category,
      );
    }
    this.sortProducts();
  }

    // Método para manejar el cambio en la opción de ordenamiento
  onSortOrderChanged(): void {
    // Invertir el orden al cambiar la opción
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    
    // Ordenar los productos nuevamente
    this.sortProducts();
  }
}

