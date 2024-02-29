import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtAuthService } from '../services/auth/jwt-auth.service';

export let authAdminGuard: CanActivateFn = () => {
  let router = inject(Router);
  let jwtAuth = inject(JwtAuthService);
  let token = localStorage.getItem('token');
  if (token === null) {
    router.navigate(['/signIn']);
  } else {
      let tokenDecoded = jwtAuth.decodeToken(token);
      if (tokenDecoded.rol != 'admin') {
        router.navigate(['/signIn']);
      }
  }
  return true;
};

