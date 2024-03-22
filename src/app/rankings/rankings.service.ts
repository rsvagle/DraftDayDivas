import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  private apiUrl = 'http://localhost:8000/api/rankings/';

  constructor(private http: HttpClient) { }

  getRankings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
