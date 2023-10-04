import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: 'signUp', component: RegisterComponent},
  {path: 'signIn', component: LoginComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'add', component: AddEditProductComponent },
  {path: 'edit/:id', component: AddEditProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
