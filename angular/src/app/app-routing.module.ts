import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: 'signUp', component: RegisterComponent},
  {path: 'signIn', component: LoginComponent},
  {path: 'productos', component: ProductosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
