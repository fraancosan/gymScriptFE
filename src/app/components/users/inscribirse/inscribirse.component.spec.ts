import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscribirseComponent } from './inscribirse.component';

describe('InscribirseComponent', () => {
  let component: InscribirseComponent;
  let fixture: ComponentFixture<InscribirseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscribirseComponent]
    });
    fixture = TestBed.createComponent(InscribirseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
