import { TestBed, inject } from '@angular/core/testing';

import { EducationalInstituteService } from './educational-institute.service';

describe('EducationalInstituteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EducationalInstituteService]
    });
  });

  it('should be created', inject([EducationalInstituteService], (service: EducationalInstituteService) => {
    expect(service).toBeTruthy();
  }));
});
