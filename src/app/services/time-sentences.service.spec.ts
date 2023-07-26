import { TestBed } from '@angular/core/testing';

import { TimeSentencesService } from './time-sentences.service';

describe('TimeSentencesService', () => {
  let service: TimeSentencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeSentencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
