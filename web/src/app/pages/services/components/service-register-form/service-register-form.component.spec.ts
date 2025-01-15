import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRegisterFormComponent } from './service-register-form.component';

describe('ServiceRegisterFormComponent', () => {
  let component: ServiceRegisterFormComponent;
  let fixture: ComponentFixture<ServiceRegisterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceRegisterFormComponent]
    });
    fixture = TestBed.createComponent(ServiceRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
