import { Component, ElementRef, Input, NgModule, ViewChild} from '@angular/core';
import { IdentifyService } from '../../services/bd/identify.service'
import { ConeccionService } from 'src/app/services/bd/coneccion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})

export class ListadosComponent{
  @Input() header!: string;
  @Input() tabla!: string;
  @ViewChild('tablaListados', { static: false }) tablaListados!: ElementRef;
  @ViewChild('addRegistros', { static: false }) addRegistros!: ElementRef;
  // variable que contiene los datos que se van a mostrar en la tabla
  listado: any[] = [];
  // Los tipos de datos se usan solo para enviarlos correctamente al back-end
  tipos: any[] = [];

  // Esquema de los datos que se van a mostrar en la tabla, sirve para saber los campos de la tabla.
  // usado para manejar los registros y darle formato a la tabla
  esquema: any;

  // se deshabilita la opcion de Añadir Clientes hasta que se carguen los datos, para evitar problemas de que pueda agregar campos a la tabla antes de que se carguen los datos
  addRegistrosDisabled: boolean = true;

  // copia del ultimo elemento editado, se usa para cancelar la edicion
  ultimoEditado: any;

  constructor(
    private identifyService: IdentifyService, 
    private bd: ConeccionService,
    private toastr: ToastrService,
    ) {};

  // Funcion que se ejecuta cuando se cambia el valor de la variable tabla
  // Tambien se ejecuta cuando se carga el componente
  ngOnChanges(): void {
    this.addRegistrosDisabled = true;
    let rta = this.identifyService.identificar(this.tabla);
    this.tipos = rta[0];
    this.esquema = rta[1];
    // Primero que nada pongo la tabla en blanco
    this.listado = [];
    // se obtienen los datos de la base de datos
    this.recargarDatos();
  };

  // Funcion que devuelve las keys que se encuentran en los JSON
  getObjectKeys(obj: any){
    return Object.keys(obj);
  };

  // Funcion usada solamente para obtener el valor de un JSON, es para usar en el arreglo tipos
  getValor(obj: any): any{
    return Object.values(obj)[0];
  }
  // Funcion usada solamente para obtener la key de un JSON, es para usar en el arreglo tipos
  getKey(obj: any){
    return Object.keys(obj)[0];
  }

  // Funcion que devuelve el nombre de la columna, es para el HTML
  convHeader(palabra: string){
    // se cambia el nombre de la columna para que se vea mejor en la tabla
    switch (palabra) {
      case "img": palabra = "Imagen"; break;
      case "precioMensual": palabra = "Precio Mensual"; break;
    }
    // se pone mayuscula la primer letra
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
  };

  borrar(idItem: any){
    let fila = this.obtenerFila(idItem);
    if (fila){
      // veo cuantas filas hay en la tabla
      let filas = this.tablaListados.nativeElement.rows.length;

      // si el item ya existe en la BD, se borra de la BD
      if (idItem != ""){
        // se borra el item de la base de datos
        this.bd.delete(this.tabla, idItem).subscribe(data => {
          this.toastr.success(data.msg, "Exito", {timeOut: 1500});
          // se borra la fila de la tabla
          fila?.remove();
          // La tabla nunca quedara vacia
          if (filas == 2){this.addRegistro()}
        });
      } else{
        // La tabla nunca quedara vacia
        if (filas == 2){this.toastr.error("No se puede borrar", "Error");} 
        else {
          // ya que la fila a borrar no esta en la BD, borro unicamente la fila de la tabla y permito añadir registros nuevamente
          this.addRegistrosDisabled = false;
          // se borra la fila de la tabla
          fila.remove();
        }
      }
    }
  };

  editar(idItem: any) {
    // se deshabilita la ultima fila editada, solamente se puede editar una a la vez
    this.volverOriginal();
    // se cancela la edicion anterior
    this.cancelar();

    // se guarda el ultimo elemento editado y cual fue su fila
    this.ultimoEditado = this.recuperarValores(idItem);

    let fila = this.obtenerFila(idItem);
    // se habilitan las celdas de la fila seleccionada
    if (fila) {
      for (let i = 0; i < (fila.cells.length - 1); i++) {
        let inputs = fila.cells[i].children[0] as HTMLInputElement;
        // No dejo que se edite el ID
        if (i != 0) {inputs.removeAttribute('disabled')};
      }
      // se ocultan los botones de editar y borrar
      this.visible(fila,fila.cells.length-1, 2, 0);
      this.visible(fila,fila.cells.length-1, 3, 1);
    }
  };

  // Funcion que crea o edita registros
  aceptar(idItem: any) {
    // se recupera el item que se va a crear o editar
    let item = this.recuperarValores(idItem);
    // Item nuevo
    if (idItem == ""){
      this.bd.create(this.tabla,item).subscribe( rta => {
        this.toastr.success(rta.msg, "Exito", {timeOut: 1500});
        // se habilita la opcion de añadir registros
        this.addRegistrosDisabled = false;
        this.recargarDatos();
      });
    }else{
      // se modifica el item de la base de datos
      this.bd.update(this.tabla, item).subscribe( rta => {
        this.toastr.success(rta.msg, "Exito", {timeOut: 1500});
        this.recargarDatos()
      });
    }
  };

  cancelar() {
    // se recuperan los valores originales del item
    let item = JSON.parse(JSON.stringify(this.ultimoEditado));
    // se obtiene la fila del item
    let fila = this.obtenerFila(item.id);
    // se escriben los valores originales en la fila
    if (fila){
      for (let i = 1; i < (fila.cells.length - 1); i++) {
        let inputs = fila.cells[i].children[0] as HTMLInputElement;
        inputs.value = item[this.getObjectKeys(item)[i]];
      }
    }
    // se vuelve al formato original de la tabla
    this.volverOriginal();
    // se reinicia historial
    this.reiniciarHistorial();
  };

  // Funcion usada para recuperar los valores de los inputs de una fila
  recuperarValores(idItem: any) {
    let fila = this.obtenerFila(idItem);
    // se crea una copia del esquema para no modificarlo
    let item = JSON.parse(JSON.stringify(this.esquema));
    if (fila){
      // se obtienen los valores de los inputs
      for (let i = 0; i < (fila.cells.length - 1); i++) {
        let inputs = fila.cells[i].children[0] as HTMLInputElement;
        // se obtienen los valores de los inputs
        if (this.getValor(this.tipos[i]) == "number"){
          // si no es un numero, la funcion devuelve NaN. Por lo tanto el programa no se rompe y luego el backend realiza la validacion de datos
          item[this.getObjectKeys(item)[i]] = Number(inputs.value);
        } else{
          item[this.getObjectKeys(item)[i]] = inputs.value;
        }
      }
    }
    return item;
  }

  addRegistro(){
    this.listado.push(JSON.parse(JSON.stringify(this.esquema)));
    this.addRegistrosDisabled = true;
    // Se pone a editar la fila
    setTimeout(() => {this.editar("");}, 100);
  }

  obtenerFila(idItem:any) {
    let tabla = this.tablaListados.nativeElement as HTMLTableElement;
    let fila;
    if (tabla){
      // busco la fila que tiene el id del item
      // si el idItem es vacio, se trata de un nuevo registro
      for (let i = 1; i < tabla.rows.length; i++) {
        let input = tabla.rows[i].cells[0].children[0] as HTMLInputElement;
        if (input.value == idItem){
          fila = tabla.rows[i];
          break;
        }
      }
    }
    return fila;
  };

  // Funcion que se encarga de recargar los datos de la tabla
  recargarDatos(){
    this.volverOriginal();
    this.reiniciarHistorial();

    this.bd.getAll(this.tabla, this.header).subscribe({
      // Todo salio bien
      next: (data: any[]) =>{
        this.listado = data;
        // Habilito la opcion de Añadir Clientes
        this.addRegistrosDisabled = false;
      },
      // Hay error
      error: (error: any) => {
        this.listado = [];
        if (error.status == 404){
          // Añado un registro vacio para que se pueda añadir un nuevo registro
          this.addRegistro();
        }
        else {
          // Se desabilita la opcion de Añadir Clientes
          this.addRegistrosDisabled = true;
        }
      },
    });
  };

  volverOriginal() {
    // Solamente la primera vez que se carga la pagina ultimoEditado es undefined
    if (this.ultimoEditado != undefined){
      // se vuelve al formato original de la fila
      let fila = this.obtenerFila(this.ultimoEditado.id);
      if (fila){
        // itero por cada celda de la fila
        for (let j = 0; j < (fila.cells.length - 1); j++) {
          fila.cells[j].children[0].setAttribute('disabled', 'true');
        }
        // se muestran solo botones editar y borrar
        this.visible(fila,fila.cells.length-1, 0, 2);
        this.visible(fila,fila.cells.length-1, 1, 3);
      }
    }
  };

  reiniciarHistorial() {
    // se reinicia el historial
    this.ultimoEditado = JSON.parse(JSON.stringify(this.esquema));
  }

  visible(fila:HTMLTableRowElement, posicion: any, mostrar: any, ocultar:any) {
    let elemento1 = fila.cells[posicion].children[mostrar];
    let elemento2 = fila.cells[posicion].children[ocultar];

    //Muestra elementos 
    elemento1.classList.remove('hidden');
    //Oculta elementos
    elemento2.classList.add('hidden');
  };
}