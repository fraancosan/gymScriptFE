import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtAuthService } from '../services/auth/jwt-auth.service';


export const authUserGuard: CanActivateFn = () => {
  let jwtAuth = inject(JwtAuthService);
  let token = localStorage.getItem('token');
  if (token === null) {
    signIn();
  }else{
    let tokenDecoded = jwtAuth.decodeToken(token);
      if (tokenDecoded.rol != 'user') {
        signIn();
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