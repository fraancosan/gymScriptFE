import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  productos: Product[] = [
    {id: 1, name: 'Monster', description: 'Bebida energizante', precio: 4, stock: 200},
    {id: 2, name: 'Protein', description: 'Proteina', precio: 4, stock: 300},
  ]

}
