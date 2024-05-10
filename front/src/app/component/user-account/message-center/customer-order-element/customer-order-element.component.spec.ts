import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderElementComponent } from './customer-order-element.component';

describe('CustomerOrderElementComponent', () => {
  let component: CustomerOrderElementComponent;
  let fixture: ComponentFixture<CustomerOrderElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerOrderElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerOrderElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
