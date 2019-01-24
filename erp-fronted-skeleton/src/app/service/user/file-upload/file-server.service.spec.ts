import { TestBed, inject } from '@angular/core/testing';

import { FileServerService } from './file-server.service';

describe('FileServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileServerService]
    });
  });

  it('should be created', inject([FileServerService], (service: FileServerService) => {
    expect(service).toBeTruthy();
  }));
});
