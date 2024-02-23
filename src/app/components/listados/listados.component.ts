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
  listado: any[] = [];

  esquema: esquemaTabla[] = [];

  addRegistrosDisabled: boolean = true;

  ultimoEditado: any;

  constructor(
    private identifyService: IdentifyService,
    private bd: ConeccionService,
    private toastr: ToastrService,
  ) {}

  ngOnChanges(): void {
    this.addRegistrosDisabled = true;
    this.esquema = this.identifyService.identificar(this.tabla);
    this.listado = [];
    this.recargarDatos();
  }

  borrar(idItem: any) {
    let fila = this.obtenerFila(idItem);
    if (fila) {
      let filas = this.tablaListados.nativeElement.rows.length;

      if (idItem != '') {
        this.bd.delete(this.tabla, idItem).subscribe((data) => {
          this.toastr.success(data.msg, 'Exito', { timeOut: 1500 });
          fila?.remove();
          if (filas == 2) {
            this.addRegistro();
          }
        });
      } else {
        if (filas == 2) {
          this.toastr.error('No se puede borrar', 'Error');
        } else {
          this.addRegistrosDisabled = false;
          fila.remove();
        }
      }
    }
  }

  editar(idItem: any) {
    this.volverOriginal();
    this.cancelar();

    this.ultimoEditado = this.recuperarValores(idItem);

    let fila = this.obtenerFila(idItem);
    if (fila) {
      for (let i = 0; i < fila.cells.length - 1; i++) {
        let inputs = fila.cells[i].children[0] as HTMLInputElement;
        if (this.esquema[i].editable && idItem != '') {
          inputs.removeAttribute('disabled');
        }
        if (idItem == '' && i != 0) {
          inputs.removeAttribute('disabled');
        }
      }
      this.visible(fila, fila.cells.length - 1, 2, 0);
      this.visible(fila, fila.cells.length - 1, 3, 1);
    }
  }

  aceptar(idItem: any) {
    let item = this.recuperarValores(idItem);
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
      if (idItem == '') {
        this.bd.create(this.tabla, item).subscribe((rta) => {
          this.toastr.success(rta.msg, 'Exito', { timeOut: 1500 });
          this.addRegistrosDisabled = false;
          this.recargarDatos();
        });
      } else {
        this.bd.update(this.tabla, item).subscribe((rta) => {
          this.toastr.success(rta.msg, 'Exito', { timeOut: 1500 });
          this.recargarDatos();
        });
      }
    }
  }

  cancelar() {
    let item = JSON.parse(JSON.stringify(this.ultimoEditado));
    let fila = this.obtenerFila(item.id);
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
    this.volverOriginal();
    this.reiniciarHistorial();
  }

  recuperarValores(idItem: any) {
    let fila = this.obtenerFila(idItem);
    let item = this.hacerJSON();
    if (fila) {
      for (let i = 0; i < fila.cells.length - 1; i++) {
        if (this.esquema[i].editable == false && i != 0 && idItem != '') {
          delete item[this.esquema[i].key];
          continue;
        }
        let inputs = fila.cells[i].children[0] as HTMLInputElement;
        switch (this.esquema[i].tipo) {
          case 'number':
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

    setTimeout(() => {
      this.editar('');
    }, 100);
  }


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

  recargarDatos() {
    this.volverOriginal();
    this.reiniciarHistorial();

    this.bd.getAll(this.tabla, this.header).subscribe({
      next: (data: any[]) => {
        if (this.tabla == 'usuarios') {
          for (let i = 0; i < data.length; i++) {
            data[i].contraseña = '';
          }
        }
        this.listado = data;
        this.addRegistrosDisabled = false;
      },
      error: (error: any) => {
        this.listado = [];
        if (error.status == 404) {
          this.addRegistro();
        } else {
          this.addRegistrosDisabled = true;
        }
      },
    });
  }

  volverOriginal() {

    if (this.ultimoEditado != undefined) {

      let fila = this.obtenerFila(this.ultimoEditado.id);
      if (fila) {

        for (let j = 0; j < fila.cells.length - 1; j++) {
          fila.cells[j].children[0].setAttribute('disabled', 'true');
        }

        this.visible(fila, fila.cells.length - 1, 0, 2);
        this.visible(fila, fila.cells.length - 1, 1, 3);
      }
    }
  }

  reiniciarHistorial() {

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


    elemento1.classList.remove('hidden');

    elemento2.classList.add('hidden');
  }
}
