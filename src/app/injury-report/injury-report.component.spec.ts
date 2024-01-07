import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjuryReportComponent } from './injury-report.component';

describe('InjuryReportComponent', () => {
  let component: InjuryReportComponent;
  let fixture: ComponentFixture<InjuryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InjuryReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InjuryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
