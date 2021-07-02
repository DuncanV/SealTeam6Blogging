import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StsNavComponent } from './sts-nav.component';

describe('StsNavComponent', () => {
  let component: StsNavComponent;
  let fixture: ComponentFixture<StsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StsNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
