import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ConeccionService {
  private urlBack: string = environment.urlBack;

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
  ) {}

  getAll(tabla: string, nombreMostrar: string): Observable<any> {
    return this.http.get(this.urlBack + tabla).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.toastr.info('No hay ' + nombreMostrar, 'Información', {
            timeOut: 3000,
          });
        } else {
          this.toastr.error(
            'No ha sido posible conectar con el servidor, intente nuevamente mas tarde',
            'Error',
            { disableTimeOut: true },
          );
        }
        return throwError(() => error);
      }),
    );
  }

  getOne(tabla: string, nombreMostrar: string, id: number): Observable<any> {
    return this.http.get(this.urlBack + tabla + '/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.toastr.error('No se encontro ' + nombreMostrar, 'Error', {
            timeOut: 3000,
          });
        } else {
          this.toastr.error(
            'No ha sido posible conectar con el servidor, intente nuevamente mas tarde',
            'Error',
            { disableTimeOut: true },
          );
        }
        return throwError(() => error);
      }),
    );
  }

  create(tabla: string, item: any): Observable<any> {
    return this.http.post<any>(this.urlBack + tabla, item).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error.error.msg, 'Error');
        return throwError(() => error);
      }),
    );
  }

  update(tabla: string, id: number, item: any): Observable<any> {
    return this.http.patch<any>(this.urlBack + tabla + '/' + id, item).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error.error.msg, 'Error');
        return throwError(() => error);
      }),
    );
  }

  delete(tabla: string, id: string): Observable<any> {
    return this.http.delete<any>(this.urlBack + tabla + '/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error.error.msg, 'Error');
        return throwError(() => error);
      }),
    );
  }

  getInscripcionActiva(idUsuario: number) {
    return this.http
      .get(
        this.urlBack +
          'inscripciones?idUsuario=' +
          idUsuario +
          '&fechaBaja=null',
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 404) {
          } else {
            this.toastr.error(
              'No ha sido posible conectar con el servidor, intente nuevamente mas tarde',
              'Error',
              { disableTimeOut: true },
            );
          }
          return throwError(() => error);
        }),
      );
  }

  pagarCuota(idInscripcion: number) {
    return this.http
      .post<any>(this.urlBack + 'cuotas', {
        idInscripcion: idInscripcion,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.msg, 'Error');
          return throwError(() => error);
        }),
      );
  }

  getUltimaCuota(idInscripcion: number) {
    return this.http
      .get(this.urlBack + 'cuotas?ultima=true&idInscripcion=' + idInscripcion)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.msg, 'Error');
          return throwError(() => error);
        }),
      );
  }

  getVencimientoCuota(idInscripcion: number) {
    return this.http
      .get(this.urlBack + 'cuotas/vencimiento/' + idInscripcion)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.msg, 'Error');
          return throwError(() => error);
        }),
      );
  }

  getActividadesPlan(idPlan: number) {
    return this.http
      .get(this.urlBack + 'plan-actividades?idPlan=' + idPlan)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.msg, 'Error');
          return throwError(() => error);
        }),
      );
  }

  getHorariosActividad(idActividad: number, idSede: number) {
    return this.http
      .get(
        this.urlBack +
          'horarios?idActividad=' +
          idActividad +
          '&idSede=' +
          idSede,
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }),
      );
  }
}
