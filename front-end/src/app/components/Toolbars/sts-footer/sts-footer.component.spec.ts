import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StsFooterComponent } from './sts-footer.component';

describe('StsFooterComponent', () => {
  let component: StsFooterComponent;
  let fixture: ComponentFixture<StsFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StsFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
