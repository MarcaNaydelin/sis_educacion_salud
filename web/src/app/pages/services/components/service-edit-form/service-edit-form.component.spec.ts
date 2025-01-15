import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEditFormComponent } from './service-edit-form.component';

describe('ServiceEditFormComponent', () => {
  let component: ServiceEditFormComponent;
  let fixture: ComponentFixture<ServiceEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceEditFormComponent]
    });
    fixture = TestBed.createComponent(ServiceEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
