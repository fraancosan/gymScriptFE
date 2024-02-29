import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ProductosComponent } from './productos/productos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authAdminGuard } from './utils/auth-admin.guard';
import { authUserGuard } from './utils/auth-user.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signUp', component: RegisterFormComponent },
  { path: 'signIn', component: LoginFormComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'user', component: UserComponent, canActivate: [authUserGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authAdminGuard],
  },
  { path: '**', redirectTo: 'home' }, // Si no encuentra la ruta, redirige a home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
