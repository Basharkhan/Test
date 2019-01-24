import { TestBed, inject } from '@angular/core/testing';

import { EmploymentTypeService } from './employmentType.service';

describe('EmploymentTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmploymentTypeService]
    });
  });

  it('should be created', inject([EmploymentTypeService], (service: EmploymentTypeService) => {
    expect(service).toBeTruthy();
  }));
});
