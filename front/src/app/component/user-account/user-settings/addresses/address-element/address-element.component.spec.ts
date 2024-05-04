import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressElementComponent } from './address-element.component';

describe('AddressElementComponent', () => {
  let component: AddressElementComponent;
  let fixture: ComponentFixture<AddressElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddressElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
