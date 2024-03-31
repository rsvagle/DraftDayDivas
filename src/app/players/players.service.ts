import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseDevUrl } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  
  private apiUrlPlayer = baseDevUrl + 'player';
  
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
    return this.http.get(baseDevUrl + "players/");
  }

  getTopPerformers(): Observable<any> {
    return this.http.get(baseDevUrl + "top-performers/");
  }
  
  filterByPosition(players: any, position: string) {
    return players.filter((player: { position: string; }) => player.position === position);
  }
  
  getSeasonStats(year: string): Observable<any>  {
    return this.http.get(baseDevUrl + `stats/${year}`);
  }

  getAllTeamPlayers(team_id: number): Observable<any>  {
    return this.http.get(baseDevUrl + `teams/players/${team_id}`);
  }
}


