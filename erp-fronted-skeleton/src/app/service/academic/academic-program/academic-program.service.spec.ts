import { TestBed, inject } from '@angular/core/testing';


describe('AcademicProgramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcademicProgramService]
    });
  });

  it('should be created', inject([AcademicProgramService], (service: AcademicProgramService) => {
    expect(service).toBeTruthy();
  }));
});
