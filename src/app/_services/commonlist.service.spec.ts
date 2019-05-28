import { TestBed, inject } from '@angular/core/testing';

import { CommonlistService } from './commonlist.service';

describe('CommonlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonlistService]
    });
  });

  it('should be created', inject([CommonlistService], (service: CommonlistService) => {
    expect(service).toBeTruthy();
  }));
});
