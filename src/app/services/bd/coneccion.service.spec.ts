import { TestBed } from '@angular/core/testing';

import { ConeccionService } from './coneccion.service';

describe('ConeccionService', () => {
  let service: ConeccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConeccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
