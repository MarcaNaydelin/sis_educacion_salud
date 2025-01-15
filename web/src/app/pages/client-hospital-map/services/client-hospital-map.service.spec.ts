import { TestBed } from '@angular/core/testing';

import { ClientHospitalMapService } from './client-hospital-map.service';

describe('ClientHospitalMapService', () => {
  let service: ClientHospitalMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientHospitalMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
