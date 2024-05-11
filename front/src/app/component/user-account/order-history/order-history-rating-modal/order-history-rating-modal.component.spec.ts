import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryRatingModalComponent } from './order-history-rating-modal.component';

describe('OrderHistoryRatingModalComponent', () => {
  let component: OrderHistoryRatingModalComponent;
  let fixture: ComponentFixture<OrderHistoryRatingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHistoryRatingModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderHistoryRatingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
