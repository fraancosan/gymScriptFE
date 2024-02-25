import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let jwtHelper = new JwtHelperService();
  const token = localStorage.getItem('token');
  if (token === null) {
    signIn();
  } else {
    if (route.routeConfig?.path === 'dashboard') {
      let tokenDecoded = jwtHelper.decodeToken(token);
      if (tokenDecoded.rol != 'admin') {
        router.navigate(['/signIn']);
      }
    } else if (route.routeConfig?.path === 'user') {
      let tokenDecoded = jwtHelper.decodeToken(token);
      if (tokenDecoded.rol != 'user') {
        signIn();
      }
    }
  }
  return true;
};

function signIn() {
  const router = inject(Router);
  const info = router.getCurrentNavigation()?.extras.state;
  if (info ? info['plan'] : false) {
    router.navigate(['/signIn'], { queryParams: { plan: info!['plan'] } });
  } else {
    router.navigate(['/signIn']);
  }
}
