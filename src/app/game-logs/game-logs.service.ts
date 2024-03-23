import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseDevUrl } from '../globals';

@Injectable({
  providedIn: 'root',
})
export class GameLogsService {
  private apiUrl = baseDevUrl + 'game-logs/';

  constructor(private http: HttpClient) {}

  // All game logs for a given player
  getPlayerGameLogs(playerId: number, season: number): Observable<any[]> {
    return this.http.get<any[]>(
        this.apiUrl + playerId + '/' + season
      );
  }

  // Recent game logs for a given player
  getRecentPlayerGameLogs(playerId: number): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl + playerId + '/recent/'
    );
  }

  // Specific game log
  getSpecificGameLog(article_id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + article_id);
  }
}
