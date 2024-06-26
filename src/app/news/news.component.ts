import { Component, OnInit, inject } from '@angular/core';
import { NewsService } from './news.service';
import { NewsArticle } from './news.article.model';
import { CommonModule } from '@angular/common';
import { PrimeNgLightModule } from '../primeng.light.module';
import { RouterLink } from '@angular/router';
import { TopHeadlinesComponent } from '../top-headlines/top-headlines.component';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'news',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule, RouterLink, TopHeadlinesComponent, TruncatePipe],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit{
  newsService = inject(NewsService);
  articles: NewsArticle[] = [];

  ngOnInit(): void {
    this.newsService.getNews(15).subscribe({
      next: (data) => this.articles = data,
      error: (error) => console.error('There was an error loading news articles!', error)
    });
  }  
}
