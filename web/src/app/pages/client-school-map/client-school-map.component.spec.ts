import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSchoolMapComponent } from './client-school-map.component';

describe('ClientSchoolMapComponent', () => {
  let component: ClientSchoolMapComponent;
  let fixture: ComponentFixture<ClientSchoolMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientSchoolMapComponent]
    });
    fixture = TestBed.createComponent(ClientSchoolMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
