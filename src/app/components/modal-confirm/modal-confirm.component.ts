import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-confirm',
  template: `
    <div class="modal-body">
      ¿Estás seguro de que quieres eliminar este registro?
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Cancelar</button>
      <button type="button" class="btn btn-primary" (click)="confirm()">Aceptar</button>
    </div>
  `
})

export class ModalConfirmComponent {
  @Output() confirmed = new EventEmitter<void>();

  constructor(public bsModalRef: BsModalRef) {}

  confirm() {
    this.confirmed.emit();
    this.bsModalRef.hide();
  }
}
