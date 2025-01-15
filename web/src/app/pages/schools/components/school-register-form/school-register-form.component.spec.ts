import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolRegisterFormComponent } from './school-register-form.component';

describe('SchoolRegisterFormComponent', () => {
  let component: SchoolRegisterFormComponent;
  let fixture: ComponentFixture<SchoolRegisterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolRegisterFormComponent]
    });
    fixture = TestBed.createComponent(SchoolRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
