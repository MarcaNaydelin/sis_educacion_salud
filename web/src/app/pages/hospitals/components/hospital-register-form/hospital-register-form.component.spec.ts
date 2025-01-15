import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalRegisterFormComponent } from './hospital-register-form.component';

describe('HospitalRegisterFormComponent', () => {
  let component: HospitalRegisterFormComponent;
  let fixture: ComponentFixture<HospitalRegisterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalRegisterFormComponent]
    });
    fixture = TestBed.createComponent(HospitalRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
