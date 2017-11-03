import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsOrderComponent } from './statistics-order.component';

describe('StatisticsOrderComponent', () => {
  let component: StatisticsOrderComponent;
  let fixture: ComponentFixture<StatisticsOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
