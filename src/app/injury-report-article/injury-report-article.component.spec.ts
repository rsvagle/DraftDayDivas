import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjuryReportArticleComponent } from './injury-report-article.component';

describe('InjuryReportArticleComponent', () => {
  let component: InjuryReportArticleComponent;
  let fixture: ComponentFixture<InjuryReportArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InjuryReportArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InjuryReportArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
