import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalRegisterFileFormComponent } from './hospital-register-file-form.component';

describe('HospitalRegisterFileFormComponent', () => {
  let component: HospitalRegisterFileFormComponent;
  let fixture: ComponentFixture<HospitalRegisterFileFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalRegisterFileFormComponent]
    });
    fixture = TestBed.createComponent(HospitalRegisterFileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
