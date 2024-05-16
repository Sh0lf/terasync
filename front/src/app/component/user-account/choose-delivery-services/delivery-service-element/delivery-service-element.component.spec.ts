import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryServiceElementComponent } from './delivery-service-element.component';

describe('DeliveryServiceElementComponent', () => {
  let component: DeliveryServiceElementComponent;
  let fixture: ComponentFixture<DeliveryServiceElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryServiceElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveryServiceElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
