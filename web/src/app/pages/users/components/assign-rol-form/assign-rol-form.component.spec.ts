import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRolFormComponent } from './assign-rol-form.component';

describe('AssignRolFormComponent', () => {
  let component: AssignRolFormComponent;
  let fixture: ComponentFixture<AssignRolFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignRolFormComponent]
    });
    fixture = TestBed.createComponent(AssignRolFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
