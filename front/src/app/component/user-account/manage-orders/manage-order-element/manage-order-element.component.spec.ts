import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrderElementComponent } from './manage-order-element.component';

describe('ManageOrderElementComponent', () => {
  let component: ManageOrderElementComponent;
  let fixture: ComponentFixture<ManageOrderElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageOrderElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageOrderElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
