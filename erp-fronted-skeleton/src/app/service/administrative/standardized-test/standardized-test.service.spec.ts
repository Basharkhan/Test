import { TestBed, inject } from '@angular/core/testing';

import { StandardizedTestService } from './standardizedTest.service';

describe('StandardizedTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StandardizedTestService]
    });
  });

  it('should be created', inject([StandardizedTestService], (service: StandardizedTestService) => {
    expect(service).toBeTruthy();
  }));
});
