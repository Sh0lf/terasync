import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDeliveryPersonsComponent } from './manage-delivery-persons.component';

describe('ManageDeliveryPersonsComponent', () => {
  let component: ManageDeliveryPersonsComponent;
  let fixture: ComponentFixture<ManageDeliveryPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDeliveryPersonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageDeliveryPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
