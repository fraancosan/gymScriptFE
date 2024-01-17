import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  userLogin,
  LoginRequest,
  Usuarios,
} from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //idea de el BehaviorSubject --> Se pasa como parametro la ultima sesion para que no tenga que entrar de nuevo por un corto periodo mediante session Storage
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>('');
  //   {
  //   id: 0,
  //   nombre: '',
  //   email: '',
  // }
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );
  private appUrl = environment.urlBack;
  private apiUrlRegister = 'usuarios';
  private apiUrlLogin = 'usuarios/loginUser';

  constructor(private http: HttpClient) {}

  login(credential: LoginRequest): Observable<string> {
    return this.http
      .post<string>(this.appUrl + this.apiUrlLogin, credential)
      .pipe(
        tap((token: string) => {
          this.currentUserData.next(token);
          this.currentUserLoginOn.next(true);
        }),
        catchError(this.handleError),
      );
  }

  register(user: Usuarios): Observable<Usuarios> {
    return this.http
      .post<Usuarios>(this.appUrl + this.apiUrlRegister, user)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(() => 'Error de conexión');
    } else {
      return throwError(() => error.error.msg);
    }
  }

  get userData(): Observable<string> {
    return this.currentUserData.asObservable();
  }
  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }
  //Ahora desde el componente dashboard hay que suscribirnos al beahaviorSubject
}
