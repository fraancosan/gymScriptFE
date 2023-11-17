import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioInscriptoComponent } from './usuario-inscripto.component';

describe('UsuarioInscriptoComponent', () => {
  let component: UsuarioInscriptoComponent;
  let fixture: ComponentFixture<UsuarioInscriptoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioInscriptoComponent]
    });
    fixture = TestBed.createComponent(UsuarioInscriptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
