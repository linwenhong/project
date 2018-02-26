import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCaseComponent } from './project-case.component';

describe('ProjectCaseComponent', () => {
  let component: ProjectCaseComponent;
  let fixture: ComponentFixture<ProjectCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
