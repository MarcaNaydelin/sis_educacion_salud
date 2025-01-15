import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolPageComponent } from './rol-page.component';

describe('RolPageComponent', () => {
  let component: RolPageComponent;
  let fixture: ComponentFixture<RolPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolPageComponent]
    });
    fixture = TestBed.createComponent(RolPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
