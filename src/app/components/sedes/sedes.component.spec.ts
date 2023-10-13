import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedesComponent } from './sedes.component';

describe('SedesComponent', () => {
  let component: SedesComponent;
  let fixture: ComponentFixture<SedesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SedesComponent]
    });
    fixture = TestBed.createComponent(SedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
