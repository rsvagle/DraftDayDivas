import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InjuryReportService } from '../injury-report/injury-report-service';
import { InjuryReportArticle } from '../injury-report/injury-report-article.model';

@Component({
  selector: 'app-injury-report-article',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule, RouterLink],
  templateUrl: './injury-report-article.component.html',
  styleUrl: './injury-report-article.component.scss'
})
export class InjuryReportArticleComponent {
  injuryReportService = inject(InjuryReportService);
  article: InjuryReportArticle;
  articleId: number;

  constructor(private route: ActivatedRoute){
    this.articleId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    // pull from backend
    this.injuryReportService.getInjuryReport(this.articleId).subscribe({
      next: (data) => this.article = data,
      error: (error) => console.error('There was an error!', error)
    });
  }  
}
