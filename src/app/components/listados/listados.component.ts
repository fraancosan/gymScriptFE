import { Component, ElementRef, Input, ViewChild} from '@angular/core';
import { IdentifyService } from '../../services/bd/identify.service'
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosComponent{
  @Input() header!: string;
  @Input() tabla!: string;
  @ViewChild('tablaListados', { static: false }) tablaListados!: ElementRef;
  listado: any[] = [];
  tipos: any[] = [];

  constructor(private identifyService: IdentifyService, private http: HttpClient) {};

   ngOnInit(): void {
    let tipos = this.identifyService.identificar(this.tabla);
    // se obtienen los datos de la base de datos
    this.http.get("https://servidordsw.onrender.com/" + this.tabla).pipe(
      catchError((  ) => {
        alert("Error al conectar con servidor, intente nuevamente mas tarde");
        return of()
      })
    ).subscribe((data: any) => { this.listado = data; });
  };

  getObjectValues(obj: any) {
    let valores = Object.values(obj);
    // se elimina el primer valor que es el ID
    valores.shift();
    return valores;
  }
  getObjectKeys(obj: any) {
    // se eliminan las keys ID
    let keys = Object.keys(obj);
    keys.shift();
    // se pone mayuscula a la primer letra de cada key
    for (let i = 0; i < keys.length; i++) {
      keys[i] = keys[i].charAt(0).toUpperCase() + keys[i].slice(1);
    }
    return keys;
  }

  editar(item: any, nroFila: any) {
    // se deshabilitan todas las filas, solamente se puede editar una a la vez
    this.volverOriginal();
    let fila = this.obtenerFila(nroFila);
    // se habilitan las celdas de la fila seleccionada
    if (fila) {
      for (let i = 0; i < (fila.cells.length - 1); i++) {
        fila.cells[i].children[0].removeAttribute('disabled');
      }

      // se ocultan los botones de editar y borrar
      this.visible(fila,fila.cells.length-1, 2, 0);
      this.visible(fila,fila.cells.length-1, 3, 1);
    }
  }

  borrar(item: any){
    // se vuelve al formato original de la tabla
    this.volverOriginal();
  }

  cancelar(item: any) {
    // se vuelve al formato original de la tabla
    this.volverOriginal();
  }

  aceptar(item: any) {
    // se vuelve al formato original de la tabla
    this.volverOriginal();
  }

  obtenerFila(nroFila:any) {
    let tabla = this.tablaListados.nativeElement as HTMLTableElement;
    let fila;
    if (tabla){
      // obtengo toda la fila en la que se encuentra el item
      fila = tabla.rows[nroFila];
    }
    return fila;
  }

  volverOriginal() {
    // se vuelve al formato original de la tabla
    let tabla = this.tablaListados.nativeElement as HTMLTableElement;
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