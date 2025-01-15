import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseRegisterFormComponent } from './course-register-form.component';

describe('CourseRegisterFormComponent', () => {
  let component: CourseRegisterFormComponent;
  let fixture: ComponentFixture<CourseRegisterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseRegisterFormComponent]
    });
    fixture = TestBed.createComponent(CourseRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
