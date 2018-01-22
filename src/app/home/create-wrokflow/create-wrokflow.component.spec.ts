import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWrokflowComponent } from './create-wrokflow.component';

describe('CreateWrokflowComponent', () => {
  let component: CreateWrokflowComponent;
  let fixture: ComponentFixture<CreateWrokflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWrokflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWrokflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
