import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryDetailedComponent } from './order-history-detailed.component';

describe('OrderHistoryDetailedComponent', () => {
  let component: OrderHistoryDetailedComponent;
  let fixture: ComponentFixture<OrderHistoryDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHistoryDetailedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderHistoryDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
