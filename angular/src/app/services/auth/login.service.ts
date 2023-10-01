import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(credential:LoginRequest):Observable<User>{
    console.log(credential);
    return this.http.get<User>('../../assets/data.json').pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0){
      console.error('An error occurred:', error.error);
    }else{
      console.error('BackEnd devolvió el código', error.status, error.error);
    }
    return throwError(()=>'Algo falló. Por favor, inténtelo de nuevo más tarde.');
  }
}
