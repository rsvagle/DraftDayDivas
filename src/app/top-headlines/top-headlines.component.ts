import { Component, inject } from '@angular/core';
import { NewsService } from '../news/news.service';
import { NewsArticle } from '../news/news.article.model';
import { CommonModule } from '@angular/common';
import { PrimeNgLightModule } from '../primeng.light.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'top-headlines',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule, RouterLink],
  templateUrl: './top-headlines.component.html',
  styleUrl: './top-headlines.component.scss'
})
export class TopHeadlinesComponent {
  newsService = inject(NewsService);
  articles: NewsArticle[] = [];

  ngOnInit(): void {
    this.newsService.getNews(10).subscribe({
      next: (data) => this.articles = data,
      error: (error) => console.error('There was an error!', error)
    });
  }  
}
