import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export let authAdminGuard: CanActivateFn = () => {
  let router = inject(Router);
  let jwtHelper = new JwtHelperService();
  let token = localStorage.getItem('token');
  if (token === null) {
    router.navigate(['/signIn']);
  } else {
      let tokenDecoded = jwtHelper.decodeToken(token);
      if (tokenDecoded.rol != 'admin') {
        router.navigate(['/signIn']);
      }
  }
  return true;
};

