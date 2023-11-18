import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
//Utilizo el metodo transform para filtrar los productos
  transform(value: any, arg: any): any {
    //Validamos que el argumento sea valido
    if (arg === '' || arg.length < 3) return value;
    const resultProducts = [];
    for(const product of value){
      //Utilizo el metodo indexOf para buscar el argumento en el nombre del producto
      if (product.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultProducts.push(product);
      };
    };
    return resultProducts;
  }
}

