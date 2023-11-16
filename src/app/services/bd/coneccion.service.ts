import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ConeccionService {
  private urlBack: string = environment.urlBack;

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    ) {}
  
  // El header es el nombre del objeto que se mostrara al usuario en caso de no haber datos
  // Ejemplo: No hay planes
  getAll(tabla: string, nombreMostrar: string): Observable<any>{
    return this.http.get(this.urlBack + tabla).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 404){
        this.toastr.info("No hay " + nombreMostrar, "Informacion",{timeOut: 3000});
      }
      else{
        this.toastr.error("No ha sido posible conectar con el servidor, intente nuevamente mas tarde", "Error",{disableTimeOut: true});
      };
      return throwError(() => error);
    })
  )};

  create(tabla: string, item: any): Observable<any>{
    // el item contiene un campo id que en el back-end se ignora dado que se crea automaticamente
    return this.http.post<any>(this.urlBack + tabla, item).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error.error.msg,"Error");
      return throwError(() => error);
      })
    );
  }


  update(tabla: string, item: any): Observable<any>{
    // el item contiene un campo id que se usa solo en la ruta
    // Luego el back-end ignora ese campo a la hora de actualizar datos
    return this.http.patch<any>(this.urlBack + tabla + "/" + item.id, item).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error.error.msg,"Error");
      return throwError(() => error);
      })
    )
  }

  delete(tabla: string, id: string): Observable<any>{
    return this.http.delete<any>(this.urlBack + tabla + "/" + id).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error.error.msg,"Error");
        return throwError(() => error);
      })
    )
  }
}