import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  
  transform(value: any, arg: any): any {
    
    if (arg === '' || arg.length < 3) return value;
    let resultProducts = [];
    for (let product of value) {
      
      if (product.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultProducts.push(product);
      }
    }
    return resultProducts;
  }
}
