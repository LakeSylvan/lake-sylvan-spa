import { TestBed } from '@angular/core/testing';

import { LakeHealthService } from './lake-health.service';

describe('LakeHHealthService', () => {
  let service: LakeHealthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LakeHealthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
