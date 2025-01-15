import { TestBed } from '@angular/core/testing';

import { ClientSchoolMapService } from './client-school-map.service';

describe('ClientSchoolMapService', () => {
  let service: ClientSchoolMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientSchoolMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
