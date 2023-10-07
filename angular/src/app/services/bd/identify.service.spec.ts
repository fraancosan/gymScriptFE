import { TestBed } from '@angular/core/testing';

import { IdentifyService } from './identify.service';

describe('IdentifyService', () => {
  let service: IdentifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
