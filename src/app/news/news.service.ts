import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsArticle } from './news.article.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = 'http://localhost:8000/api/news/';

  constructor(private http: HttpClient) { }

  getNews(): Observable<NewsArticle[]> {
    return this.http.get<NewsArticle[]>(this.apiUrl);
  }
}
