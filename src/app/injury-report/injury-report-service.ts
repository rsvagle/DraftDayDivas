import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InjuryReportArticle } from './injury-report-article.model';

@Injectable({
  providedIn: 'root'
})
export class InjuryReportService {

  private apiUrl = 'http://localhost:8000/api/injury-report/';

  constructor(private http: HttpClient) { }

  getInjuryReport(): Observable<InjuryReportArticle[]> {
    return this.http.get<InjuryReportArticle[]>(this.apiUrl);
  }

  getAllInjuryReports(playerId: number): Observable<InjuryReportArticle[]> {
    return this.http.get<InjuryReportArticle[]>(this.apiUrl + playerId + "/all/");
  }
}
