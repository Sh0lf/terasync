import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodsElementComponent } from './payment-methods-element.component';

describe('PaymentMethodsElementComponent', () => {
  let component: PaymentMethodsElementComponent;
  let fixture: ComponentFixture<PaymentMethodsElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMethodsElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentMethodsElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
