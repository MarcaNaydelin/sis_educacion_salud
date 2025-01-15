import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolEditFormComponent } from './school-edit-form.component';

describe('SchoolEditFormComponent', () => {
  let component: SchoolEditFormComponent;
  let fixture: ComponentFixture<SchoolEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolEditFormComponent]
    });
    fixture = TestBed.createComponent(SchoolEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
