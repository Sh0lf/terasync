import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductElementComponent } from './product-element.component';

describe('ProductElementComponent', () => {
  let component: ProductElementComponent;
  let fixture: ComponentFixture<ProductElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
