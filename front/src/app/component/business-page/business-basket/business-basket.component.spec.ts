import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessBasketComponent } from './business-basket.component';

describe('BusinessBasketComponent', () => {
  let component: BusinessBasketComponent;
  let fixture: ComponentFixture<BusinessBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessBasketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
