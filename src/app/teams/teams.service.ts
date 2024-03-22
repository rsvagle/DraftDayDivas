import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FootballTeam } from './team.model';
import { baseDevUrl } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private apiUrl = baseDevUrl + '/teams/';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<FootballTeam[]> {
    return this.http.get<FootballTeam[]>(this.apiUrl);
  }

  getTeamSummary(teamId: number): Observable<FootballTeam> {
    return this.http.get<FootballTeam>(this.apiUrl + teamId);
  }
}
