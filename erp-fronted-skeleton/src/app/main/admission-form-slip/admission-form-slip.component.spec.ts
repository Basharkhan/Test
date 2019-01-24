import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionFormSlipComponent } from './admission-form-slip.component';

describe('AdmissionFormSlipComponent', () => {
  let component: AdmissionFormSlipComponent;
  let fixture: ComponentFixture<AdmissionFormSlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionFormSlipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionFormSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
