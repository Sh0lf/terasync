import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPersonElementComponent } from './delivery-person-element.component';

describe('DeliveryPersonComponent', () => {
  let component: DeliveryPersonElementComponent;
  let fixture: ComponentFixture<DeliveryPersonElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryPersonElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryPersonElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
