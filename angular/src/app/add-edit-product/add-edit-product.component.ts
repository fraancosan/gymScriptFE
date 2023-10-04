import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit{
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      precio: [null, Validators.required],
      stock: [null, Validators.required],
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addProduct() {
    console.log(this.form.value.name)

    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      precio: this.form.value.precio,
      stock: this.form.value.stock
    }
  }



}
