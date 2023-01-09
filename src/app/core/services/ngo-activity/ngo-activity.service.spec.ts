import { TestBed } from '@angular/core/testing';

import { NgoActivityService } from './ngo-activity.service';

describe('NgoActivityService', () => {
  let service: NgoActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgoActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
