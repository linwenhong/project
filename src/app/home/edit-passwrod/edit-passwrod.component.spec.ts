import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPasswrodComponent } from './edit-passwrod.component';

describe('EditPasswrodComponent', () => {
  let component: EditPasswrodComponent;
  let fixture: ComponentFixture<EditPasswrodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPasswrodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPasswrodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
