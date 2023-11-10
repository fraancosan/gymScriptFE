import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './components/loading/loading.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SedesComponent } from './components/sedes/sedes.component';
import { ProductosComponent } from './productos/productos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListadosComponent } from './components/listados/listados.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    LoadingComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AboutUsComponent,
    SedesComponent,
    ProductosComponent,
    LoginFormComponent,
    DashboardComponent,
    ListadosComponent,
    ProductCardComponent,
    RegisterFormComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
