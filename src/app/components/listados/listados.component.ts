import { Component, ElementRef, Input, ViewChild} from '@angular/core';
import { IdentifyService } from '../../services/bd/identify.service'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';
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

  // URL del servidor de back-end
  private urlBack = "https://servidordsw.onrender.com/";

  constructor(
    private identifyService: IdentifyService, 
    private http: HttpClient,
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
    this.reiniciarHistorial();
  };

  // Funcion que devuelve las keys que se encuentran en los JSON
  getObjectKeys(obj: any) {
    return Object.keys(obj);
  };

  // Funcion que devuelve el nombre de la columna, es para el HTML
  convHeader(palabra: string){
    // se cambia el nombre de la columna para que se vea mejor en la tabla
    if (palabra == "img"){
      palabra = "Imagen"
    }
    // se pone mayuscula la primer letra
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
  };

  borrar(idItem: any){
    this.volverOriginal();
    let fila = this.obtenerFila(idItem);
    if (fila){
      // Busco el ID del elemento a borrar
      let input = fila.cells[0].children[0] as HTMLInputElement;
      if (input.value != ""){
        // se borra el item de la base de datos
        this.http.delete<any>(this.urlBack + this.tabla + "/" + input.value).pipe(
          catchError((error: HttpErrorResponse) => {
            this.toastr.error(error.error.msg,"Error");
            return of ()
          })
        ).subscribe(data => this.toastr.success(data.msg, "Exito"));
      } else{
        // ya que la fila a borrar no esta en la BD, borro unicamente la fila de la tabla y permito añadir registros nuevamente
        this.addRegistrosDisabled = false;
      }
      // se borra la fila de la tabla
      fila.remove();

      // veo cuantas filas hay en la tabla
      let table = this.tablaListados.nativeElement as HTMLTableElement;
      let filas = table.rows.length;
      // En caso de que ya no queden mas registros luego de borrar, añado uno vacio.
      if (filas == 1){
        this.addRegistro();
        // Si se trataba de un registro que no estaba en la BD, se vuelve a inhabilitar la opcion de añadir registros
        // y se avisa que no se puede borrar
        if (input.value == ""){
          this.addRegistrosDisabled = true;
          this.toastr.error("No se puede borrar", "Error");
        }
      }
      this.reiniciarHistorial();
    }
  };

  editar(idItem: any) {
    // se deshabilita la ultima fila editada, solamente se puede editar una a la vez
    this.volverOriginal();

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

  cancelar(idItem: any) {
    let fila = this.obtenerFila(idItem);
    // se recuperan los valores originales del item
    let item = JSON.parse(JSON.stringify(this.ultimoEditado));
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

  // Funcion que crea o edita registros
  aceptar(idItem: any) {
    // se recupera el item que se va a crear o editar
    let item = this.recuperarValores(idItem);

    // se saca el id del JSON
    delete item.id;

    // Item nuevo
    if (idItem == ""){
      this.http.post<any>(this.urlBack + this.tabla, item).pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.msg,"Error");
        return of()
        })
      ).subscribe( rta => {
        this.toastr.success(rta.msg, "Exito");
        // se vuelve al formato original de la tabla
        this.volverOriginal();
        // se recargan los datos
        this.recargarDatos();
        // se habilita la opcion de añadir registros
        this.addRegistrosDisabled = false;
      });
    }else{
      // se modifica el item de la base de datos
      this.http.patch<any>(this.urlBack + this.tabla + "/" + idItem, item).pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.msg,"Error");
        return of()
        })
      ).subscribe( rta => {
        this.toastr.success(rta.msg, "Exito");
        // se vuelve al formato original de la tabla
        this.volverOriginal();
        // se recargan los datos
        this.recargarDatos();
      });
    }
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
        if (this.tipos[i] == "number"){
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
      // si el idItem es vacio, se trata de un nuevo registro o que aun no se cargo en la BD
      // sea cual sea el caso, se busca la ultima fila de la tabla
      if (idItem == ""){
        fila = tabla.rows[tabla.rows.length-1];
      } else{
        // busco la fila que tiene el id del item
        for (let i = 1; i < tabla.rows.length; i++) {
          let input = tabla.rows[i].cells[0].children[0] as HTMLInputElement;
          if (input.value == idItem){
            fila = tabla.rows[i];
            break;
          }
        }
      }
    }
    return fila;
  };

  recargarDatos(){
    this.http.get(this.urlBack + this.tabla).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 404){
        this.toastr.info("No hay datos para mostrar", "Informacion",{timeOut: 3000});
        this.listado = [];
        // Añado un registro vacio para que se pueda añadir un nuevo registro
        this.addRegistro();
      }
      else{
        this.toastr.error("No ha sido posible conectar con el servidor, intente nuevamente mas tarde", "Error",{disableTimeOut: true});
        this.listado = [];
        // Se desabilita la opcion de Añadir Clientes
        this.addRegistrosDisabled = true;
      };
      return of()
    })
    ).subscribe((data: any) => { 
      this.listado = data;
      // Habilito la opcion de Añadir Clientes
      this.addRegistrosDisabled = false;
    });
  };

  volverOriginal() {
    // se vuelve al formato original de la tabla
    // la primera vez no hay ultimoEditado, sin embargo al buscar la fila se obtiene la ultima fila de la tabla
    // esto no altera el funcionamiento del programa, por lo tanto no se modifica
    // se volvera al estado original, de algo que ya esta original

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