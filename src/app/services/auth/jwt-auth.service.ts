import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class JwtAuthService {
  constructor() {}

  decodeToken(token: string) {
    let jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
  }

  // public getToken(): string {
  //   return localStorage.getItem('token')s || '';
  // }
}
