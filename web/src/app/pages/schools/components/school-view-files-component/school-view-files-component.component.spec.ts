import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolViewFilesComponentComponent } from './school-view-files-component.component';

describe('SchoolViewFilesComponentComponent', () => {
  let component: SchoolViewFilesComponentComponent;
  let fixture: ComponentFixture<SchoolViewFilesComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolViewFilesComponentComponent]
    });
    fixture = TestBed.createComponent(SchoolViewFilesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
