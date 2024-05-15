import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPageReviewsComponent } from './business-page-reviews.component';

describe('BusinessPageReviewsComponent', () => {
  let component: BusinessPageReviewsComponent;
  let fixture: ComponentFixture<BusinessPageReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessPageReviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessPageReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
