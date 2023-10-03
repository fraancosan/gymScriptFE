import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap} from 'rxjs';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //idea de el BehaviorSubject --> Se pasa como parametro la ultima sesion para que no tenga que entrar de nuevo por un corto periodo mediante session Storage
  currentUserData:BehaviorSubject<User> = new BehaviorSubject<User>({id:0, nombre:'', email:''});
  currentUserLoginOn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(credential:LoginRequest):Observable<User>{
    console.log(credential);
    return this.http.get<User>('../../assets/data.json').pipe(
    //acciones asincronas mientras se ejecuta el observable, no modifica la info de user
      tap((user:User)=>{
        this.currentUserData.next(user);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0){
      console.error('An error occurred:', error.error);
    }else{
      console.error('BackEnd devolvió el código', error.status, error.error);
    }
    return throwError(()=>'Algo falló. Por favor, inténtelo de nuevo más tarde.');
  }

  get userData ():Observable<User>{
    return this.currentUserData.asObservable();
  }
  get userLoginOn ():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
  //Ahora desde el componente dashboard hay que suscribirnos al beahaviorSubject
}
