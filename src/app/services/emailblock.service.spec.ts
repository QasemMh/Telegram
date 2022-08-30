import { TestBed } from '@angular/core/testing';

import { EmailblockService } from './emailblock.service';

describe('EmailblockService', () => {
  let service: EmailblockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailblockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
