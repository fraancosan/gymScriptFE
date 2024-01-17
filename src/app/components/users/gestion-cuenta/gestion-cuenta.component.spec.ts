import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCuentaComponent } from './gestion-cuenta.component';

describe('GestionCuentaComponent', () => {
  let component: GestionCuentaComponent;
  let fixture: ComponentFixture<GestionCuentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCuentaComponent],
    });
    fixture = TestBed.createComponent(GestionCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
