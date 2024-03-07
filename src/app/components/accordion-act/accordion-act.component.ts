import { Component, Input, OnInit } from '@angular/core';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';

@Component({
  selector: 'app-accordion-act',
  templateUrl: './accordion-act.component.html',
  styleUrls: ['./accordion-act.component.css']
})
export class AccordionActComponent implements OnInit{
  @Input() actividades:any;
  @Input() idSede:number = 0;
  horarios:any[] = [];

  constructor(private bd:ConeccionService) { }

  ngOnInit(): void {
    this.bd.getHorariosActividad(this.actividades.idActividad, this.idSede).subscribe({
      next: (data: any) => {
        this.horarios = data;
      },
      error: (error: any) => {
        this.horarios = [];
      },
    });
  }
}
