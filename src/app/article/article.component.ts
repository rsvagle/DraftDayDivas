import { Component, inject } from '@angular/core';
import { NewsService } from '../news/news.service';
import { ActivatedRoute } from '@angular/router';
import { NewsArticle } from '../news/news.article.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'article',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  newsService = inject(NewsService);
  article: NewsArticle;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');

    if (articleId) {
      this.newsService.getNewsArticle(+articleId).subscribe((article) => {
        this.article = article;
      });
    }
  }
}
