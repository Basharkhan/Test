import { TestBed, inject } from '@angular/core/testing';
import {DegreeOfferedService} from './degree-offered.service';


describe('DegreeOfferedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DegreeOfferedService]
    });
  });

  it('should be created', inject([DegreeOfferedService], (service: DegreeOfferedService) => {
    expect(service).toBeTruthy();
  }));
});
