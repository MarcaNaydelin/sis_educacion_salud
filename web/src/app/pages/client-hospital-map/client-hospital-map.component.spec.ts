import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHospitalMapComponent } from './client-hospital-map.component';

describe('ClientHospitalMapComponent', () => {
  let component: ClientHospitalMapComponent;
  let fixture: ComponentFixture<ClientHospitalMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientHospitalMapComponent]
    });
    fixture = TestBed.createComponent(ClientHospitalMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
