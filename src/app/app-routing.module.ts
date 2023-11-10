import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ProductosComponent } from './productos/productos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signUp', component: RegisterFormComponent },
  { path: 'signIn', component: LoginFormComponent },
  { path: 'productos', component: ProductosComponent },
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}