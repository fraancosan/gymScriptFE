import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export let authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let jwtHelper = new JwtHelperService();
  let token = localStorage.getItem('token');
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
  let router = inject(Router);
  let info = router.getCurrentNavigation()?.extras.state;
  if (info ? info['plan'] : false) {
    router.navigate(['/signIn'], { queryParams: { plan: info!['plan'] } });
  } else {
    router.navigate(['/signIn']);
  }
}
