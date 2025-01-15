import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalViewFilesComponent } from './hospital-view-files.component';

describe('HospitalViewFilesComponent', () => {
  let component: HospitalViewFilesComponent;
  let fixture: ComponentFixture<HospitalViewFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalViewFilesComponent]
    });
    fixture = TestBed.createComponent(HospitalViewFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
