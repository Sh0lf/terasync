import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPfpComponent } from './upload-pfp.component';

describe('UploadPfpComponent', () => {
  let component: UploadPfpComponent;
  let fixture: ComponentFixture<UploadPfpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadPfpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadPfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
