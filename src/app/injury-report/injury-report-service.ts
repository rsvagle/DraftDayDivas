import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InjuryReportArticle } from './injury-report-article.model';
import { baseDevUrl } from '../globals';

@Injectable({
  providedIn: 'root',
})
export class InjuryReportService {
  private apiUrl = baseDevUrl + 'injury-report/';

  constructor(private http: HttpClient) {}

  // All injury reports
  getInjuryReports(): Observable<InjuryReportArticle[]> {
    return this.http.get<InjuryReportArticle[]>(this.apiUrl);
  }

  // All injury reports for a given player
  getAllPlayerInjuryReports(
    playerId: number
  ): Observable<InjuryReportArticle[]> {
    return this.http.get<InjuryReportArticle[]>(
      this.apiUrl + playerId + '/all/'
    );
  }

  // Specific injury report article
  getInjuryReport(article_id: number): Observable<InjuryReportArticle> {
    return this.http.get<InjuryReportArticle>(this.apiUrl + article_id);
  }
}
