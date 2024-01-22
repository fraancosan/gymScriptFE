import {
  Component,
  ElementRef,
  Input,
  NgModule,
  ViewChild,
} from '@angular/core';
import { IdentifyService } from '../../services/bd/identify.service';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';
import { ToastrService } from 'ngx-toastr';
import { esquemaTabla } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css'],
})
export class ListadosComponent {
  @Input() header!: string;
  @Input() tabla!: string;
  @ViewChild('tablaListados', { static: false }) tablaListados!: ElementRef;
  @ViewChild('addRegistros', { static: false }) addRegistros!: ElementRef;
  // variable que contiene los datos que se van a mostrar en la tabla
  listado: any[] = [];

  // esquemas de datos que se van a mostrar en la tabla
  esquema: esquemaTabla[] = [];

  // se deshabilita la opcion de Añadir Clientes hasta que se carguen los datos, para evitar problemas de que pueda agregar campos a la tabla antes de que se carguen los datos
  addRegistrosDisabled: boolean = true;

  // copia del ultimo elemento editado, se usa para cancelar la edicion
  ultimoEditado: any;

  constructor(
    private identifyService: IdentifyService,
    private bd: ConeccionService,
    private toastr: ToastrService,
  ) {}

  // Funcion que se ejecuta cuando se cambia el valor de la variable tabla
  // Tambien se ejecuta cuando se carga el componente
  ngOnChanges(): void {
    this.addRegistrosDisabled = true;
    this.esquema = this.identifyService.identificar(this.tabla);
    // Primero que nada pongo la tabla en blanco
    this.listado = [];
    // se obtienen los datos de la base de datos
    this.recargarDatos();
  }

  borrar(idItem: any) {
    let fila = this.obtenerFila(idItem);
    if (fila) {
      // veo cuantas filas hay en la tabla
      let filas = this.tablaListados.nativeElement.rows.length;

      // si el item ya existe en la BD, se borra de la BD
      if (idItem != '') {
        // se borra el item de la base de datos
        this.bd.delete(this.tabla, idItem).subscribe((data) => {
          this.toastr.success(data.msg, 'Exito', { timeOut: 1500 });
          // se borra la fila de la tabla
          fila?.remove();
          // La tabla nunca quedara vacia
          if (filas == 2) {
            this.addRegistro();
          }
        });
      } else {
        // La tabla nunca quedara vacia
        if (filas == 2) {
          this.toastr.error('No se puede borrar', 'Error');
        } else {
          // ya que la fila a borrar no esta en la BD, borro unicamente la fila de la tabla y permito añadir registros nuevamente
          this.addRegistrosDisabled = false;
          // se borra la fila de la tabla
          fila.remove();
        }
      }
    }
  }

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
      for (let i = 0; i < fila.cells.length - 1; i++) {
        let inputs = fila.cells[i].children[0] as HTMLInputElement;
        // Dejo que se puedan editar solo los campos autorizados
        // Si la tabla es nueva, se habilitan todos los campos salvo el id
        if (this.esquema[i].editable && idItem != '') {
          inputs.removeAttribute('disabled');
        }
        // En caso de que la fila sea nueva, se habilitan todos los campos salvo el id
        if (idItem == '' && i != 0) {
          inputs.removeAttribute('disabled');
        }
      }
      // se ocultan los botones de editar y borrar
      this.visible(fila, fila.cells.length - 1, 2, 0);
      this.visible(fila, fila.cells.length - 1, 3, 1);
    }
  }

  // Funcion que crea o edita registros
  aceptar(idItem: any) {
    // se recupera el item que se va a crear o editar
    let item = this.recuperarValores(idItem);
    // todos los campos que no se hayan editado no se envian al backend
    for (let key in item) {
      if (key == 'id') {
        continue;
      }
      if (item[key] == this.ultimoEditado[key]) {
        delete item[key];
      } else {
        continue;
      }
    }
    if (Object.keys(item).length == 1) {
      this.toastr.warning('No se modificó ningún dato', 'Advertencia');
      this.cancelar();
      return;
    } else {
      // Item nuevo
      if (idItem == '') {
        this.bd.create(this.tabla, item).subscribe((rta) => {
          this.toastr.success(rta.msg, 'Exito', { timeOut: 1500 });
          // se habilita la opcion de añadir registros
          this.addRegistrosDisabled = false;
          this.recargarDatos();
        });
      } else {
        // se modifica el item de la base de datos
        this.bd.update(this.tabla, item).subscribe((rta) => {
          this.toastr.success(rta.msg, 'Exito', { timeOut: 1500 });
          this.recargarDatos();
        });
      }
    }
  }

  cancelar() {
    // se recuperan los valores originales del item
    let item = JSON.parse(JSON.stringify(this.ultimoEditado));
    // se obtiene la fila del item
    let fila = this.obtenerFila(item.id);
    // se escriben los valores originales en la fila
    if (fila) {
      for (let i = 1; i < fila.cells.length - 1; i++) {
        let inputs = fila.cells[i].children[0] as HTMLInputElement;
        if (item.id == '') {
          inputs.value = '';
          continue;
        } else if (this.esquema[i].editable) {
          inputs.value = item[this.esquema[i].key];
          continue;
        }
      }
    }
    // se vuelve al formato original de la tabla
    this.volverOriginal();
    // se reinicia historial
    this.reiniciarHistorial();
  }

  // Funcion usada para recuperar los valores de los inputs de una fila
  recuperarValores(idItem: any) {
    let fila = this.obtenerFila(idItem);
    // se crea una copia del esquema para no modificarlo
    let item = this.hacerJSON();
    if (fila) {
      // se obtienen los valores de los inputs
      for (let i = 0; i < fila.cells.length - 1; i++) {
        // Solo se recuperan los editables y el id en caso de que se este editando un registro
        // Si es nuevo se recupera todo
        if (this.esquema[i].editable == false && i != 0 && idItem != '') {
          delete item[this.esquema[i].key];
          continue;
        }
        let inputs = fila.cells[i].children[0] as HTMLInputElement;
        // se obtienen los valores de los inputs
        switch (this.esquema[i].tipo) {
          case 'number':
            // si no es un numero, la funcion devuelve NaN. Por lo tanto el programa no se rompe y luego el backend realiza la validacion de datos
            item[this.esquema[i].key] = Number(inputs.value);
            break;
          case 'date':
            item[this.esquema[i].key] = new Date(inputs.value + 'T00:00:00');
            break;
          default:
            item[this.esquema[i].key] = inputs.value;
            break;
        }
      }
    }
    return item;
  }

  addRegistro() {
    this.listado.push(this.hacerJSON());
    this.addRegistrosDisabled = true;
    // Se pone a editar la fila
    setTimeout(() => {
      this.editar('');
    }, 100);
  }

  // Funcion que se encarga de armar un JSON con las keys correspondientes
  // Se usa para enviar los datos al backend, esta vacia en un principio
  hacerJSON() {
    let json: any = {};
    for (let i = 0; i < this.esquema.length; i++) {
      json[this.esquema[i].key] = '';
    }
    return json;
  }

  obtenerFila(idItem: any) {
    let tabla = this.tablaListados.nativeElement as HTMLTableElement;
    let fila;
    if (tabla) {
      // busco la fila que tiene el id del item
      // si el idItem es vacio, se trata de un nuevo registro
      for (let i = 1; i < tabla.rows.length; i++) {
        let input = tabla.rows[i].cells[0].children[0] as HTMLInputElement;
        if (input.value == idItem) {
          fila = tabla.rows[i];
          break;
        }
      }
    }
    return fila;
  }

  // Funcion que se encarga de recargar los datos de la tabla
  recargarDatos() {
    this.volverOriginal();
    this.reiniciarHistorial();

    this.bd.getAll(this.tabla, this.header).subscribe({
      // Todo salio bien
      next: (data: any[]) => {
        // si se trata de un listado de usuarios, su contraseña se pone en blanco. Para que el admin solo pueda volverla a generar pero nunca verla
        if (this.tabla == 'usuarios') {
          for (let i = 0; i < data.length; i++) {
            data[i].contraseña = '';
          }
        }
        this.listado = data;
        // Habilito la opcion de Añadir Clientes
        this.addRegistrosDisabled = false;
      },
      // Hay error
      error: (error: any) => {
        this.listado = [];
        if (error.status == 404) {
          // Añado un registro vacio para que se pueda añadir un nuevo registro
          this.addRegistro();
        } else {
          // Se desabilita la opcion de Añadir Clientes
          this.addRegistrosDisabled = true;
        }
      },
    });
  }

  volverOriginal() {
    // Solamente la primera vez que se carga la pagina ultimoEditado es undefined
    if (this.ultimoEditado != undefined) {
      // se vuelve al formato original de la fila
      let fila = this.obtenerFila(this.ultimoEditado.id);
      if (fila) {
        // itero por cada celda de la fila
        for (let j = 0; j < fila.cells.length - 1; j++) {
          fila.cells[j].children[0].setAttribute('disabled', 'true');
        }
        // se muestran solo botones editar y borrar
        this.visible(fila, fila.cells.length - 1, 0, 2);
        this.visible(fila, fila.cells.length - 1, 1, 3);
      }
    }
  }

  reiniciarHistorial() {
    // se reinicia el historial
    this.ultimoEditado = this.hacerJSON();
  }

  visible(
    fila: HTMLTableRowElement,
    posicion: any,
    mostrar: any,
    ocultar: any,
  ) {
    let elemento1 = fila.cells[posicion].children[mostrar];
    let elemento2 = fila.cells[posicion].children[ocultar];

    //Muestra elementos
    elemento1.classList.remove('hidden');
    //Oculta elementos
    elemento2.classList.add('hidden');
  }
}
