import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let jwtHelper = new JwtHelperService();
  const token = localStorage.getItem('token');
  if (token === null) {
    router.navigate(['/signIn']);
  }else{
    if(route.routeConfig?.path === 'dashboard' ) {
      let tokenDecoded = jwtHelper.decodeToken(token);
      if(tokenDecoded.rol != "admin"){
        router.navigate(['/signIn']);
      }
    }else if(route.routeConfig?.path === 'user'){
      let tokenDecoded = jwtHelper.decodeToken(token);
      if(tokenDecoded.rol != "user"){
        router.navigate(['/signIn']);
      }
    }
  }
  return true;
};