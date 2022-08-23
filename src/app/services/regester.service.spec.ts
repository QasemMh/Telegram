import { TestBed } from '@angular/core/testing';

import { RegesterService } from './regester.service';

describe('RegesterService', () => {
  let service: RegesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
