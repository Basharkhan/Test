import { TestBed, inject } from '@angular/core/testing';

import { DegreeConcentrationService } from './degree-concentration.service';

describe('DegreeConcentrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DegreeConcentrationService]
    });
  });

  it('should be created', inject([DegreeConcentrationService], (service: DegreeConcentrationService) => {
    expect(service).toBeTruthy();
  }));
});
