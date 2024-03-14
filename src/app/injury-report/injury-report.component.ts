import { Component, OnInit, inject } from '@angular/core';
import { InjuryReportService } from './injury-report-service';
import { InjuryReportArticle } from './injury-report-article.model';
import { CommonModule } from '@angular/common';
import { PrimeNgLightModule } from '../primeng.light.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule, RouterLink],
  templateUrl: './injury-report.component.html',
  styleUrl: './injury-report.component.scss'
})
export class InjuryReportComponent implements OnInit{
  injuryReportService = inject(InjuryReportService);
  articles: InjuryReportArticle[] = [];

  ngOnInit(): void {
    // pull from backend
    this.injuryReportService.getInjuryReport().subscribe({
      next: (data) => this.articles = data,
      error: (error) => console.error('There was an error!', error)
    });
  }  
}
