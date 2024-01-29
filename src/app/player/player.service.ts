import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  
  private apiUrlSummary = 'http://localhost:8000/api/player/player-summary/';

  constructor(private http: HttpClient) {}

  getPlayerSummary(id: number): Observable<any> {
    return this.http.get(`${this.apiUrlSummary}${id}`);
  }
}
