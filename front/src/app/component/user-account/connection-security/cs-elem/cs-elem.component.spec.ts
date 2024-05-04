import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsElemComponent } from './cs-elem.component';

describe('CsElemComponent', () => {
  let component: CsElemComponent;
  let fixture: ComponentFixture<CsElemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsElemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CsElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
