import { Component, Input, OnInit } from '@angular/core';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'],
})
export class ActividadesComponent implements OnInit {
  @Input() inscripcion: any;
  actividades?: any[];
  customClass = 'customClass';

  constructor(
    private bd: ConeccionService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.bd.getActividadesPlan(this.inscripcion.idPlan).subscribe({
      next: (data: any) => {
        this.actividades = data;
      },
      error: (error: any) => {
        this.toastr.error(error.error.msg, 'Error', { timeOut: 1500 });
      },
    });
  }
}
