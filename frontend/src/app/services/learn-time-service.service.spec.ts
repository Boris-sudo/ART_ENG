import { TestBed } from '@angular/core/testing';

import { LearnTimeServiceService } from './learn-time-service.service';

describe('LearnTimeServiceService', () => {
  let service: LearnTimeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearnTimeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
