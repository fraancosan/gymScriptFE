import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionInscripcionComponent } from './gestion-inscripcion.component';

describe('GestionInscripcionComponent', () => {
  let component: GestionInscripcionComponent;
  let fixture: ComponentFixture<GestionInscripcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionInscripcionComponent]
    });
    fixture = TestBed.createComponent(GestionInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
