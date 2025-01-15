import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolRegisterFileFormComponent } from './school-register-file-form.component';

describe('SchoolRegisterFileFormComponent', () => {
  let component: SchoolRegisterFileFormComponent;
  let fixture: ComponentFixture<SchoolRegisterFileFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolRegisterFileFormComponent]
    });
    fixture = TestBed.createComponent(SchoolRegisterFileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
