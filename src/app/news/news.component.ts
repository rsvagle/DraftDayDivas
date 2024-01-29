import { Component, OnInit, inject } from '@angular/core';
import { NewsService } from './news.service';
import { NewsArticle } from './news.article.model';
import { CommonModule } from '@angular/common';
import { PrimeNgLightModule } from '../primeng.light.module';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit{
  newsService = inject(NewsService);
  articles: NewsArticle[] = [];

  ngOnInit(): void {
    // pull from backend
    this.newsService.getNews().subscribe({
      next: (data) => this.articles = data,
      error: (error) => console.error('There was an error!', error)
    });
  }  
}
