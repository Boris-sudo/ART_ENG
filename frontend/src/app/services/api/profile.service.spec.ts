import { TestBed } from '@angular/core/testing';

import { ProfileApiService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
