import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NewsArticle } from '../news/news.article.model';
import { NewsService } from '../news/news.service';
import { PrimeNgLightModule } from '../primeng.light.module';
import { PlayerSummaryComponent } from '../player-summary/player-summary.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule, PlayerSummaryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  newsService = inject(NewsService);
  title = 'DraftDayDivas';
  articles: NewsArticle[] = [];

  ngOnInit(): void {
    // pull from backend
    this.newsService.getNews().subscribe({
      next: (data) => this.articles = data,
      error: (error) => console.error('There was an error!', error)
    });
  }
}
