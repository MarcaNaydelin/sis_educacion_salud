import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolRegisterFormComponent } from './rol-register-form.component';

describe('RolRegisterFormComponent', () => {
  let component: RolRegisterFormComponent;
  let fixture: ComponentFixture<RolRegisterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolRegisterFormComponent]
    });
    fixture = TestBed.createComponent(RolRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
