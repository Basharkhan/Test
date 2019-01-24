import { TestBed, inject } from '@angular/core/testing';

import { GsuiteUserService } from './gsuiteUser.service';

describe('GsuiteUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GsuiteUserService]
    });
  });

  it('should be created', inject([GsuiteUserService], (service: GsuiteUserService) => {
    expect(service).toBeTruthy();
  }));
});
