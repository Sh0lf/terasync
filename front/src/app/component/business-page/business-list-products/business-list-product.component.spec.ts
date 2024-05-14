import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessListProductComponent } from './business-list-product.component';

describe('BusinessPreviousOrdersComponent', () => {
  let component: BusinessListProductComponent;
  let fixture: ComponentFixture<BusinessListProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessListProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
