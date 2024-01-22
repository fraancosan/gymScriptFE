import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      providers: [provideToastr(), provideHttpClient()],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // nombre field tests

  it("nombre field should be invalid if it's empty", () => {
    let nombre = component.registerForm.controls.nombre;
    expect(nombre.valid).toBeFalsy();
  });

  it("nombre field should be invalid if it's not a string", () => {
    let nombre = component.registerForm.controls.nombre;
    nombre.setValue('1234');
    expect(nombre.valid).toBeFalsy();
  });

  // apellido field tests

  it("apellido field should be invalid if it's empty", () => {
    let apellido = component.registerForm.controls.apellido;
    expect(apellido.valid).toBeFalsy();
  });

  it("apellido field should be invalid if it's not a string", () => {
    let apellido = component.registerForm.controls.apellido;
    apellido.setValue('1234');
    expect(apellido.valid).toBeFalsy();
  });

  // dni field tests

  it("DNI field should be invalid if it's empty", () => {
    let dni = component.registerForm.controls.dni;
    expect(dni.valid).toBeFalsy();
  });

  it('DNI field should be valid if its a number', () => {
    let dni = component.registerForm.controls.dni;
    dni.setValue(1234);
    expect(dni.valid).toBeTrue();
  });

  it("DNI field should be invalid if it's less than one character", () => {
    let dni = component.registerForm.controls.dni;
    dni.setValue(0);
    expect(dni.valid).toBeFalsy();
  });

  it("DNI field should be invalid if it's more than 8 characters", () => {
    let dni = component.registerForm.controls.dni;
    dni.setValue(123456789);
    expect(dni.valid).toBeFalsy();
  });

  // telefono field tests

  it("telefono field should be valid if it's empty", () => {
    let telefono = component.registerForm.controls.telefono;
    expect(telefono.valid).toBeTrue();
  });

  it('telefono field should be valid if its a number', () => {
    let telefono = component.registerForm.controls.telefono;
    telefono.setValue('12345');
    expect(telefono.valid).toBeTrue();
  });

  it("telefono field should be invalid if it's less than 5 characters", () => {
    let telefono = component.registerForm.controls.telefono;
    telefono.setValue('1234');
    expect(telefono.valid).toBeFalsy();
  });

  it("telefono field should be invalid if it's more than 15 characters", () => {
    let telefono = component.registerForm.controls.telefono;
    telefono.setValue('1234567890123456');
    expect(telefono.valid).toBeFalsy();
  });

  // email field tests

  it("email field should be invalid if it's empty", () => {
    let email = component.registerForm.controls.mail;
    expect(email.valid).toBeFalsy();
  });

  it("email field should be invalid if it's not a valid email", () => {
    let email = component.registerForm.controls.mail;
    email.setValue('abc');
    expect(email.valid).toBeFalsy();
  });

  it("email field should be valid if it's a valid email", () => {
    let email = component.registerForm.controls.mail;
    email.setValue('test@test.com');
    expect(email.valid).toBeTruthy();
  });

  // contraseña field tests
  it("contraseña field should be invalid if it's empty", () => {
    let contraseña = component.registerForm.controls.contraseña;
    expect(contraseña.valid).toBeFalsy();
  });

  it("contraseña field should be invalid if it's less than 8 characters", () => {
    let contraseña = component.registerForm.controls.contraseña;
    contraseña.setValue('1234567');
    expect(contraseña.valid).toBeFalsy();
  });

  it("contraseña field should be valid if it's more than 8 characters", () => {
    let contraseña = component.registerForm.controls.contraseña;
    contraseña.setValue('12345678');
    expect(contraseña.valid).toBeTruthy();
  });
});
