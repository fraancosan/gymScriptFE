import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-usuario-inscripto',
  templateUrl: './usuario-inscripto.component.html',
  styleUrls: ['./usuario-inscripto.component.css']
})
export class UsuarioInscriptoComponent {
  @Input() inscripcion: any;
  
  ngOnInit(): void {
    console.log(this.inscripcion);
  }
}
