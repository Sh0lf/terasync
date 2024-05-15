import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPageOrderConfirmationComponent } from './business-page-order-confirmation.component';

describe('BusinessPageOrderConfirmationComponent', () => {
  let component: BusinessPageOrderConfirmationComponent;
  let fixture: ComponentFixture<BusinessPageOrderConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessPageOrderConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessPageOrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
