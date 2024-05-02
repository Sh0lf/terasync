import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryElementListComponent } from './order-history-element-list.component';

describe('OrderHistoryElementListComponent', () => {
  let component: OrderHistoryElementListComponent;
  let fixture: ComponentFixture<OrderHistoryElementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHistoryElementListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderHistoryElementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
