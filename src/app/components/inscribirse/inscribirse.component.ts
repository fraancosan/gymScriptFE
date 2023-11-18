import { Component, Input} from '@angular/core';
import { ConeccionService } from 'src/app/services/bd/coneccion.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-inscribirse',
  templateUrl: './inscribirse.component.html',
  styleUrls: ['./inscribirse.component.css']
})
export class InscribirseComponent{
    @Input() idUser!: number;
    jwtHelper = new JwtHelperService();
    planes: any;
    sedes: any;
    idPlanSelected: string = '';
    idSedeSelected: number = 0;
    disabledButton: boolean = true;

  constructor(private bd: ConeccionService) {
    bd.getAll("planes", "planes").subscribe((planes: any) => {
      for (let i = 0; i < planes.length; i++) {
        planes[i].descripcion = planes[i].descripcion.split("-").map((plan: any) => plan.trim());
      }
      planes.sort((a: any, b: any) => a.precioMensual - b.precioMensual);
      this.planes = planes;
    });

    bd.getAll("sedes", "sedes").subscribe((sedes: any) => {
      this.sedes = sedes;
    });
  }

  createInscription(idPlan:string, idSede:number) {
    console.log(this.idUser);
    this.bd.create("inscripciones", {"idUsuario": this.idUser,"idPlan": Number(idPlan), "idSede": Number(idSede)}).subscribe((inscripcion: any) => {
      console.log(inscripcion);
    });
  }

  updateButtonState() {
    this.disabledButton = !this.idPlanSelected || !this.idSedeSelected;
  }

  ngOnInit(): void {
    const idPlanFromLocalStorage = localStorage.getItem("idPlan");
    this.idPlanSelected = idPlanFromLocalStorage !== null ? idPlanFromLocalStorage : "";
  }
}
