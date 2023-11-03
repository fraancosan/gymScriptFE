import { Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
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
  listado: any[] = [];
  tipos: any[] = [];
  esquema: any;
  // se deshabilita la opcion de Añadir Clientes hasta que se carguen los datos, para evitar problemas de que pueda agregar campos a la tabla antes de que se carguen los datos
  addRegistrosDisabled: boolean = true;
  // URL del servidor de back-end
  private urlBack = "https://servidordsw.onrender.com/";

  constructor(
    private identifyService: IdentifyService, 
    private http: HttpClient,
    private toastr: ToastrService,
    private renderer: Renderer2) {};
    

  ngOnInit(): void {
    this.addRegistrosDisabled = true;
    let rta = this.identifyService.identificar(this.tabla);
    this.tipos = rta[0];
    this.esquema = rta[1];
    // se obtienen los datos de la base de datos
    this.recargarDatos();
  }

  // Funcion que devuelve los valores que se encuentran en los JSON, es para el HTML
  getObjectValues(obj: any) {
    let valores = Object.values(obj);
    return valores;
  };

  // Funcion que devuelve las keys que se encuentran en los JSON, es para el HTML
  getObjectKeys(obj: any) {
    let keys = Object.keys(obj);
    // se pone mayuscula a la primer letra de cada key
    for (let i = 0; i < keys.length; i++) {
      keys[i] = keys[i].charAt(0).toUpperCase() + keys[i].slice(1);
    }
    return keys;
  };

  editar(nroFila: any) {
    // se deshabilitan todas las filas, solamente se puede editar una a la vez
    this.volverOriginal();
    let fila = this.obtenerFila(nroFila);
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

  borrar(nroFila: any){
    let fila = this.obtenerFila(nroFila);
    if (fila){
      // Busco el ID del elemento a borrar
      let input = fila.cells[0].children[0] as HTMLInputElement;
      // se borra el item de la base de datos
      this.http.delete<any>(this.urlBack + this.tabla + "/" + input.value).subscribe();
    }
    // se borra la fila de la tabla
    fila?.remove();
    // se vuelve al formato original de la tabla
    this.volverOriginal();
  };

  cancelar() {
    // se vuelve al formato original de la tabla
    this.volverOriginal();
  };

  aceptar(nroFila: any) {
    let fila = this.obtenerFila(nroFila);
    // se crea una copia del esquema para no modificarlo
    let item = JSON.parse(JSON.stringify(this.esquema));
    if (fila){
      // se obtienen los valores de los inputs
      for (let i = 0; i < (fila.cells.length - 1); i++) {
        let inputs = fila.cells[i].children[0] as HTMLInputElement;
        // se obtienen los valores de los inputs
        item[Object.keys(item)[i]] = inputs.value;
      }
    }
    // se obtiene el ID del item y se saca del JSON
    let id = item.id;
    delete item.id;
    if (id == ""){
      this.http.post<any>(this.urlBack + this.tabla, item).pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.msg,"Error");
        return of()
        })
      ).subscribe();
    }else{
      // se modifica el item de la base de datos
      this.http.patch<any>(this.urlBack + this.tabla + "/" + id, item).pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.msg,"Error");
        return of()
        })
      ).subscribe();
    }
    // se vuelve al formato original de la tabla
    this.volverOriginal();
  };

  addRegistro(){
    this.volverOriginal();
    let tabla = this.tablaListados.nativeElement as HTMLTableElement;
    let fila = tabla.insertRow();
    // Estilo original de la fila
    fila.classList.add('table-light');
    // Se añaden los campos vacios editables
    for (let i = 0; i < (tabla.rows[0].cells.length- 1); i++) {
      let celda = fila.insertCell();
      // arreglar problemas
      let input= this.renderer.createElement('input');
      this.renderer.setAttribute(input, "value", "");
      this.renderer.setAttribute(input, "type", this.tipos[i]);
      this.renderer.setAttribute(input, "disabled", "true");
      this.renderer.appendChild(celda, input);
    }
    // se agregan botones
    let celda = fila.insertCell();
    // Problemas de compatibilidad se crea cada boton por separado
    this.crearBoton(celda, "btn btn-warning btn-sm botones", 'Editar', (parametro) => this.editar(parametro), fila.rowIndex);
    this.crearBoton(celda, "btn btn-secondary btn-sm ms-2 botones", 'Borrar', (parametro) => this.borrar(parametro), fila.rowIndex);
    this.crearBoton(celda, "btn btn-warning btn-sm hidden botones", 'Aceptar', (parametro) => this.aceptar(parametro), fila.rowIndex);
    this.crearBoton(celda, "btn btn-secondary btn-sm ms-2 hidden botones", 'Cancelar', () => this.cancelar());

    // Se pone a editar la fila
    this.editar(fila.rowIndex);
  }

  // Funcion usada para crear botones en la tabla, solo se usa en la funcion addRegistro()
  crearBoton(celda: HTMLTableCellElement, clases:any, texto:string,funcion: (parametro:any) => any, parametro?:any){
    let boton = this.renderer.createElement('button');
    this.renderer.setAttribute(boton, "type", "button");
    this.renderer.setAttribute(boton, "class", clases);
    this.renderer.appendChild(boton, this.renderer.createText(texto));
    this.renderer.listen(boton, 'click', () => funcion(parametro));
    this.renderer.appendChild(celda, boton);
  }

  obtenerFila(nroFila:any) {
    let tabla = this.tablaListados.nativeElement as HTMLTableElement;
    let fila;
    if (tabla){
      // obtengo toda la fila en la que se encuentra el item
      fila = tabla.rows[nroFila];
    }
    return fila;
  };

  recargarDatos(){
    this.http.get(this.urlBack + this.tabla).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 404){
        this.toastr.info("No hay datos para mostrar", "Informacion",{timeOut: 3000})
        // Si hay error 404 devuelvo array vacio para que no de error al cargar el componente, AUTOMATIZAR
        this.listado = [{ "id": "", 'nombre': '', 'apellido': '', 'telefono': '', 'email': ''}];
        // Habilito la opcion de Añadir Clientes
        this.addRegistrosDisabled = false;
      }
      else{
        this.toastr.error("No ha sido posible conectar con el servidor, intente nuevamente mas tarde", "Error",{disableTimeOut: true});
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
  };

  visible(fila:HTMLTableRowElement, posicion: any, mostrar: any, ocultar:any) {
    let elemento1 = fila.cells[posicion].children[mostrar];
    let elemento2 = fila.cells[posicion].children[ocultar];

    //Muestra elementos 
    elemento1.classList.remove('hidden');
    //Oculta elementos
    elemento2.classList.add('hidden');
  };
}