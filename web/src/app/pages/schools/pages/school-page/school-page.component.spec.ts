import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolPageComponent } from './school-page.component';

describe('SchoolPageComponent', () => {
  let component: SchoolPageComponent;
  let fixture: ComponentFixture<SchoolPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolPageComponent]
    });
    fixture = TestBed.createComponent(SchoolPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
