import { TestBed } from '@angular/core/testing';

import { HeaderServiceService } from './header-service.service';

describe('HeaderServiceService', () => {
  let service: HeaderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
