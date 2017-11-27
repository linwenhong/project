import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDishComponent } from './single-dish.component';

describe('SingleDishComponent', () => {
  let component: SingleDishComponent;
  let fixture: ComponentFixture<SingleDishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
