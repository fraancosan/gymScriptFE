import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-actividades-plan',
  templateUrl: './modal-actividades-plan.component.html',
})
export class ModalActividadesPlanComponent implements OnInit {
  @Input() planId!: string;
  actividades?: any[];
  isLoading = false;

  constructor(
    public modalRef: BsModalRef,
    private bd: ConeccionService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.getActividades();
  }

  getActividades() {
    this.isLoading = true;
    this.bd.getActividadesPlan(+this.planId).subscribe({
      next: (data: any) => {
        this.actividades = data;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.toastr.error(error.error.msg, 'Error', { timeOut: 1500 });
        this.isLoading = false;
      },
    });
  }
}
