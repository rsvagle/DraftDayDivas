import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsArticle } from './news.article.model';
import { baseDevUrl } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = baseDevUrl + 'news/';

  constructor(private http: HttpClient) { }

  getNews(limit: number | null): Observable<NewsArticle[]> {
    let params = new HttpParams();
    if (limit !== null) {
      params = params.append('limit', limit.toString());
    }

    return this.http.get<NewsArticle[]>(this.apiUrl, { params });
  }

  getNewsArticle(id: number): Observable<NewsArticle> {
    return this.http.get<NewsArticle>(this.apiUrl + 'article/' + id);
  }

  getPlayerNewsArticles(player_id: number): Observable<NewsArticle> {
    return this.http.get<NewsArticle>(this.apiUrl + 'player/' + player_id + "/all/");
  }
}
