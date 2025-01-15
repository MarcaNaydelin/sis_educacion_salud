import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalEditFormComponent } from './hospital-edit-form.component';

describe('HospitalEditFormComponent', () => {
  let component: HospitalEditFormComponent;
  let fixture: ComponentFixture<HospitalEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalEditFormComponent]
    });
    fixture = TestBed.createComponent(HospitalEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
