import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FootballTeam } from './team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private apiUrl = 'http://localhost:8000/api/teams/';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<FootballTeam[]> {
    return this.http.get<FootballTeam[]>(this.apiUrl);
  }
}
