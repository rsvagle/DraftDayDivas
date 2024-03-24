import { Component, SimpleChanges, inject } from '@angular/core';
import { NewsService } from '../news/news.service';
import { ActivatedRoute } from '@angular/router';
import { NewsArticle } from '../news/news.article.model';
import { CommonModule, DatePipe } from '@angular/common';
import { TopHeadlinesComponent } from '../top-headlines/top-headlines.component';

@Component({
  selector: 'article',
  standalone: true,
  imports: [CommonModule, DatePipe, TopHeadlinesComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  newsService = inject(NewsService);
  article: NewsArticle;
  articleId: string | null;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.articleId = params['id'];
      if (this.articleId) {
        this.getNewsArticle(+this.articleId);
      }
    });
  }

  getNewsArticle(id: number) {
    if (this.articleId) {
      this.newsService.getNewsArticle(id).subscribe((article) => {
        this.article = article;
      });
    }
  }
}
