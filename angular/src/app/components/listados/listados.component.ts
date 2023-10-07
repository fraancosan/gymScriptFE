import { Component, Input} from '@angular/core';
import { IdentifyService } from '../../services/bd/identify.service'
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosComponent{
  
  @Input() header!: string;
  @Input() tabla!: string;
  listado: any[] = [];

  constructor(private identifyService: IdentifyService) {};

  ngOnInit(): void {
    this.listado = this.identifyService.identificar(this.tabla);
  };

  getObjectValues(obj: any) {
    return Object.values(obj);
  }
  getObjectKeys(obj: any) {
    return Object.keys(obj);
  }

  editar(item: any) {
    // se deshabilitan todas las filas, solamente se puede editar una a la vez
    this.volverOriginal();
    let fila = this.obtenerFila(item);
    // se habilitan las celdas de la fila seleccionada
    if (fila) {
      for (let i = 1; i < (fila.cells.length - 1); i++) {
        fila.cells[i].children[0].removeAttribute('disabled');
      }

      // se ocultan los botones de editar y borrar
      this.visible(fila,fila.cells.length-1, 2, 0);
      this.visible(fila,fila.cells.length-1, 3, 1);
    }
  }

  borrar(item: any){

  }

  cancelar(item: any) {
    // se vuelve al formato original de la tabla
    this.volverOriginal();
  }

  aceptar(item: any) {
    // se vuelve al formato original de la tabla
    this.volverOriginal();
  }

  obtenerFila(item:any) {
    // obtenido el item, obtengo el valor de su ID para saber en que columna se encuentra
    let id = item.id;
    let tabla = document.getElementById("tablaListados") as HTMLTableElement;
    let fila;
    if (tabla){
      // obtengo toda la fila en la que se encuentra el item
      fila = tabla.rows[id];
    }
    return fila;
  }

  volverOriginal() {
    // se vuelve al formato original de la tabla
    let tabla = document.getElementById("tablaListados") as HTMLTableElement;
    if (tabla) {
      // itero por cada fila de la tabla
      for (let i = 1; i < tabla.rows.length; i++) {
        let fila = tabla.rows[i];
        // itero por cada celda de la fila
        for (let j = 0; j < (fila.cells.length - 1); j++) {
          fila.cells[j].children[0].setAttribute('disabled', 'true');
        }
        // se muestran solo botones editar y borrar
        this.visible(fila,fila.cells.length-1, 0, 2);
        this.visible(fila,fila.cells.length-1, 1, 3);
      }
    }
  }

  visible(fila:HTMLTableRowElement, posicion: any, mostrar: any, ocultar:any) {
    let elemento1 = fila.cells[posicion].children[mostrar];
    let elemento2 = fila.cells[posicion].children[ocultar];

    //Muestra elementos 
    elemento1.classList.remove('hidden');
    //Oculta elementos
    elemento2.classList.add('hidden');
  } 
}