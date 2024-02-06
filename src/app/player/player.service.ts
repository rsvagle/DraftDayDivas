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

  filterByPosition(players: any, position: string) {
    return players.filter((player: { position: string; }) => player.position === position);
  }

  genericPlayers = [
    { 
      first_name : "Ryan",
      last_name : "Vagle",
      position : "QB",
      team_name: "Vikings",
      photo_url: "avatar01.png", 
      season_passing_yards: 5000,
      season_passing_tds: 50,
      season_rushing_yards: 120,
      season_rushing_tds: 2,
      season_receiving_yards: 0,
      season_receiving_tds: 0,
      season_field_goals_made: 0,
      season_field_goals_attempted: 0,
      season_fantasy_points: 500
    },
    // Adding 5 more QBs
    { first_name: "John", last_name: "Doe", position: "QB", team_name: "Patriots", photo_url: "avatar01.png", season_passing_yards: 4000, season_passing_tds: 30, season_rushing_yards: 300, season_rushing_tds: 5, season_fantasy_points: 430 },
    { first_name: "Mike", last_name: "Smith", position: "QB", team_name: "Raiders", photo_url: "avatar03.png", season_passing_yards: 3500, season_passing_tds: 28, season_rushing_yards: 200, season_rushing_tds: 3, season_fantasy_points: 377 },
    { first_name: "Alex", last_name: "Jones", position: "QB", team_name: "Bears", photo_url: "avatar05.png", season_passing_yards: 4200, season_passing_tds: 35, season_rushing_yards: 100, season_rushing_tds: 2, season_fantasy_points: 442 },
    { first_name: "Sam", last_name: "Wilson", position: "QB", team_name: "Dolphins", photo_url: "avatar07.png", season_passing_yards: 3800, season_passing_tds: 25, season_rushing_yards: 150, season_rushing_tds: 4, season_fantasy_points: 389 },
    { first_name: "Luke", last_name: "Morris", position: "QB", team_name: "Giants", photo_url: "avatar09.png", season_passing_yards: 4100, season_passing_tds: 32, season_rushing_yards: 250, season_rushing_tds: 3, season_fantasy_points: 437 },
  
    // Adding 6 RBs
    { first_name: "Tom", last_name: "Brown", position: "RB", team_name: "Jets", photo_url: "avatar05.png", season_rushing_yards: 1200, season_rushing_tds: 9, season_receiving_yards: 400, season_receiving_tds: 2, season_fantasy_points: 196 },
    { first_name: "Eric", last_name: "Davis", position: "RB", team_name: "Falcons", photo_url: "avatar01.png", season_rushing_yards: 1000, season_rushing_tds: 7, season_receiving_yards: 300, season_receiving_tds: 3, season_fantasy_points: 163 },
    { first_name: "Adam", last_name: "Green", position: "RB", team_name: "Seahawks", photo_url: "avatar07.png", season_rushing_yards: 1100, season_rushing_tds: 8, season_receiving_yards: 200, season_receiving_tds: 1, season_fantasy_points: 158 },
    { first_name: "Jack", last_name: "White", position: "RB", team_name: "Lions", photo_url: "avatar06.png", season_rushing_yards: 950, season_rushing_tds: 10, season_receiving_yards: 450, season_receiving_tds: 4, season_fantasy_points: 197 },
    { first_name: "Gary", last_name: "Miller", position: "RB", team_name: "Texans", photo_url: "avatar04.png", season_rushing_yards: 850, season_rushing_tds: 6, season_receiving_yards: 550, season_receiving_tds: 5, season_fantasy_points: 185 },
    { first_name: "Neal", last_name: "Walker", position: "RB", team_name: "Packers", photo_url: "avatar01.png", season_rushing_yards: 1300, season_rushing_tds: 12, season_receiving_yards: 250, season_receiving_tds: 1, season_fantasy_points: 207 },
  
    // Adding 6 WRs
    { first_name: "Cody", last_name: "Taylor", position: "WR", team_name: "Broncos", photo_url: "avatar01.png", season_receiving_yards: 1400, season_receiving_tds: 10, season_fantasy_points: 220 },
    { first_name: "Brett", last_name: "Allen", position: "WR", team_name: "Chiefs", photo_url: "avatar02.png", season_receiving_yards: 1300, season_receiving_tds: 9, season_fantasy_points: 204 },
    { first_name: "Dylan", last_name: "Scott", position: "WR", team_name: "Eagles", photo_url: "avatar08.png", season_receiving_yards: 1100, season_receiving_tds: 8, season_fantasy_points: 176 },
    { first_name: "Mason", last_name: "Clark", position: "WR", team_name: "Ravens", photo_url: "avatar03.png", season_receiving_yards: 1200, season_receiving_tds: 7, season_fantasy_points: 174 },
    { first_name: "Kyle", last_name: "Lewis", position: "WR", team_name: "49ers", photo_url: "avatar04.png", season_receiving_yards: 1050, season_receiving_tds: 6, season_fantasy_points: 162 },
    { first_name: "Evan", last_name: "Roberts", position: "WR", team_name: "Buccaneers", photo_url: "avatar06.png", season_receiving_yards: 1150, season_receiving_tds: 11, season_fantasy_points: 199 },
  
    // Adding 6 TEs
    { first_name: "Ian", last_name: "Howard", position: "TE", team_name: "Panthers", photo_url: "avatar04.png", season_receiving_yards: 800, season_receiving_tds: 6, season_fantasy_points: 128 },
    { first_name: "Owen", last_name: "Reed", position: "TE", team_name: "Titans", photo_url: "avatar05.png", season_receiving_yards: 750, season_receiving_tds: 5, season_fantasy_points: 115 },
    { first_name: "Sean", last_name: "Cook", position: "TE", team_name: "Saints", photo_url: "avatar02.png", season_receiving_yards: 700, season_receiving_tds: 7, season_fantasy_points: 122 },
    { first_name: "Chase", last_name: "Sullivan", position: "TE", team_name: "Colts", photo_url: "avatar01.png", season_receiving_yards: 650, season_receiving_tds: 4, season_fantasy_points: 98 },
    {
      first_name: "Jake",
      last_name: "Thomas",
      position: "TE",
      team_name: "Broncos",
      photo_url: "avatar08.png", 
      season_passing_yards: 0,
      season_passing_tds: 0,
      season_rushing_yards: 0,
      season_rushing_tds: 0,
      season_receiving_yards: 800,
      season_receiving_tds: 5,
      season_field_goals_made: 0,
      season_field_goals_attempted: 0,
      season_fantasy_points: 104 // 800 receiving yards + 5 TDs
    },
    {
      first_name: "Michael",
      last_name: "Carter",
      position: "TE",
      team_name: "Titans",
      photo_url: "avatar08.png", 
      season_passing_yards: 0,
      season_passing_tds: 0,
      season_rushing_yards: 0,
      season_rushing_tds: 0,
      season_receiving_yards: 650,
      season_receiving_tds: 4,
      season_field_goals_made: 0,
      season_field_goals_attempted: 0,
      season_fantasy_points: 89 // 650 receiving yards + 4 TDs
    },

    {
      first_name: "Adam",
      last_name: "Vinatieri",
      position: "K",
      team_name: "Patriots",
      photo_url: "avatar07.png", 
      season_passing_yards: 0,
      season_passing_tds: 0,
      season_rushing_yards: 0,
      season_rushing_tds: 0,
      season_receiving_yards: 0,
      season_receiving_tds: 0,
      season_field_goals_made: 30,
      season_field_goals_attempted: 35,
      season_fantasy_points: 90 // 30 field goals
    },
    {
      first_name: "Justin",
      last_name: "Tucker",
      position: "K",
      team_name: "Ravens",
      photo_url: "avatar06.png", 
      season_passing_yards: 0,
      season_passing_tds: 0,
      season_rushing_yards: 0,
      season_rushing_tds: 0,
      season_receiving_yards: 0,
      season_receiving_tds: 0,
      season_field_goals_made: 33,
      season_field_goals_attempted: 36,
      season_fantasy_points: 99 // 33 field goals
    },
    {
      first_name: "Mason",
      last_name: "Crosby",
      position: "K",
      team_name: "Packers",
      photo_url: "avatar09.png", 
      season_passing_yards: 0,
      season_passing_tds: 0,
      season_rushing_yards: 0,
      season_rushing_tds: 0,
      season_receiving_yards: 0,
      season_receiving_tds: 0,
      season_field_goals_made: 28,
      season_field_goals_attempted: 32,
      season_fantasy_points: 84 // 28 field goals
    },
    {
      first_name: "Robbie",
      last_name: "Gould",
      position: "K",
      team_name: "49ers",
      photo_url: "avatar03.png", 
      season_passing_yards: 0,
      season_passing_tds: 0,
      season_rushing_yards: 0,
      season_rushing_tds: 0,
      season_receiving_yards: 0,
      season_receiving_tds: 0,
      season_field_goals_made: 25,
      season_field_goals_attempted: 30,
      season_fantasy_points: 75 // 25 field goals
    },
    {
      first_name: "Harrison",
      last_name: "Butker",
      position: "K",
      team_name: "Chiefs",
      photo_url: "avatar05.png", 
      season_passing_yards: 0,
      season_passing_tds: 0,
      season_rushing_yards: 0,
      season_rushing_tds: 0,
      season_receiving_yards: 0,
      season_receiving_tds: 0,
      season_field_goals_made: 32,
      season_field_goals_attempted: 35,
      season_fantasy_points: 96 // 32 field goals
    },
    {
      first_name: "Matt",
      last_name: "Prater",
      position: "K",
      team_name: "Lions",
      photo_url: "avatar02.png", 
      season_passing_yards: 0,
      season_passing_tds: 0,
      season_rushing_yards: 0,
      season_rushing_tds: 0,
      season_receiving_yards: 0,
      season_receiving_tds: 0,
      season_field_goals_made: 27,
      season_field_goals_attempted: 31,
      season_fantasy_points: 81 // 27 field goals
    }    
    
  
  ]
}


