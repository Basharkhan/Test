import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EduInfoModalComponent } from './edu-info-modal.component';

describe('EduInfoModalComponent', () => {
  let component: EduInfoModalComponent;
  let fixture: ComponentFixture<EduInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
