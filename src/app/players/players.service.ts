import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  
  private apiUrlPlayer = 'http://localhost:8000/api/player';
  
  constructor(private http: HttpClient) {}
  
  getPlayerSummary(player_id: number): Observable<any> {
    return this.http.get(`${this.apiUrlPlayer}/player-summary/${player_id}`);
  }
  
  getPlayerAllSeasons(player_id: number): Observable<any> {
    return this.http.get(`${this.apiUrlPlayer}/all-seasons/${player_id}`);
  }
  
  getPlayerSeasons(player_id: number): Observable<any> {
    return this.http.get(`${this.apiUrlPlayer}/player-seasons/${player_id}`);
  }
  
  getAllPlayers(): Observable<any> {
    return this.http.get("http://localhost:8000/api/players/");
  }

  getTopPerformers(): Observable<any> {
    return this.http.get("http://localhost:8000/api/top-performers/");
  }
  
  filterByPosition(players: any, position: string) {
    return players.filter((player: { position: string; }) => player.position === position);
  }
  
  getSeasonStats(year: string): Observable<any>  {
    return this.http.get(`http://localhost:8000/api/stats/${year}`);
  }
}


