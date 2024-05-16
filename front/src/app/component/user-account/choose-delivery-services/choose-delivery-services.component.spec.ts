import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDeliveryServicesComponent } from './choose-delivery-services.component';

describe('ChooseDeliveryServicesComponent', () => {
  let component: ChooseDeliveryServicesComponent;
  let fixture: ComponentFixture<ChooseDeliveryServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseDeliveryServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseDeliveryServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
