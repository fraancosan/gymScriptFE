import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
  idEditando = '';
  file: any;

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
    this.idEditando = '';
    const pos = this.getValuePos(idItem);
    if (idItem != '') {
      this.bd.delete(this.tabla, idItem).subscribe((data) => {
        this.toastr.success(data.msg, 'Exito', { timeOut: 1500 });
        this.listado.splice(pos, 1);
        if (this.listado.length === 0) {
          this.addRegistro();
        }
      });
    } else if (this.listado.length == 1) {
      // Se quiere borrar el registro que se esta creando (ES NUEVO)
      this.toastr.error('No se puede borrar', 'Error');
    } else {
      this.addRegistrosDisabled = false;
      this.listado.splice(pos, 1);
    }
  }

  editar(idItem: any) {
    this.cancelar();
    this.idEditando = idItem;
    this.ultimoEditado =
      idItem !== '' ? this.getValue(idItem) : this.hacerJSON();
  }

  aceptar(idItem: any) {
    this.idEditando = '';
    const item = this.file
      ? this.makeFormData(this.getValue(idItem))
      : this.getValue(idItem);
    // Solo quiero mantener los datos modificados
    for (let key in item) {
      if (item[key] == this.ultimoEditado[key] && key != 'id') {
        delete item[key];
      }
    }
    console.log(item);
    if (Object.keys(item).length == 1) {
      this.toastr.warning('No se modificó ningún dato', 'Advertencia');
      this.cancelar();
    } else if (idItem == '') {
      this.bd.create(this.tabla, item).subscribe((rta) => {
        this.toastr.success(rta.msg, 'Exito', { timeOut: 1500 });
        this.addRegistrosDisabled = false;
        this.recargarDatos();
      });
    } else {
      this.bd.update(this.tabla, idItem, item).subscribe((rta) => {
        this.toastr.success(rta.msg, 'Exito', { timeOut: 1500 });
        this.recargarDatos();
      });
    }
  }

  cancelar() {
    this.idEditando = '';
    const ultimoEditado = this.copyJSON(this.ultimoEditado);
    const pos = this.getValuePos(ultimoEditado.id);
    this.listado[pos] = ultimoEditado;
    this.reiniciarHistorial();
  }

  addRegistro() {
    this.listado.push(this.hacerJSON());
    this.addRegistrosDisabled = true;

    setTimeout(() => {
      this.editar('');
    }, 100);
  }

  getValuePos(idItem: any) {
    return this.listado.findIndex((item) => item.id == idItem);
  }

  getValue(idItem: any) {
    const pos = this.getValuePos(idItem);
    const item = this.copyJSON(this.listado[pos]);
    for (let i = 0; i < this.esquema.length; i++) {
      switch (this.esquema[i].tipo) {
        case 'number':
          item[this.esquema[i].key] = Number(item[this.esquema[i].key]);
          break;
        case 'date':
          item[this.esquema[i].key] = new Date(
            item[this.esquema[i].key] + 'T00:00:00',
          );
          break;
      }
    }
    return item;
  }

  recargarDatos() {
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

  getFile(event: any) {
    this.file = event;
  }

  makeFormData(item: any) {
    const formData = new FormData();
    for (let key in item) {
      formData.append(key, item[key]);
    }
    formData.append('file', this.file);
    return formData;
  }

  reiniciarHistorial() {
    this.ultimoEditado = this.hacerJSON();
    this.file = null;
  }

  copyJSON(json: any) {
    return JSON.parse(JSON.stringify(json));
  }

  hacerJSON() {
    let json: any = {};
    for (let i = 0; i < this.esquema.length; i++) {
      json[this.esquema[i].key] = '';
    }
    return this.copyJSON(json);
  }
}
