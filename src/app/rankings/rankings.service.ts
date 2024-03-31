import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseDevUrl } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  private apiUrl = baseDevUrl + 'rankings/';

  constructor(private http: HttpClient) { }

  getRankings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
