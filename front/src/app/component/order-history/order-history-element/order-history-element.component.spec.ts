import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryElementComponent } from './order-history-element.component';

describe('OrderHistoryElementComponent', () => {
  let component: OrderHistoryElementComponent;
  let fixture: ComponentFixture<OrderHistoryElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHistoryElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderHistoryElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
