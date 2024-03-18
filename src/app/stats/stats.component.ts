import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';
import { PositionSelectorComponent } from '../position-selector/position-selector.component';
import { PlayersService } from '../players/players.service';
import { RouterLink } from '@angular/router';
import { TeamSelectorComponent } from '../team-selector/team-selector.component';
import { SeasonSelectorComponent } from '../season-selector/season-selector.component';
import { PlayerStatsDisplayComponent } from '../player-stats-display/player-stats-display.component';
import { FootballPosition } from '../globals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNgLightModule, 
    PositionSelectorComponent, 
    RouterLink, 
    TeamSelectorComponent, 
    SeasonSelectorComponent, 
    PlayerStatsDisplayComponent
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  season_stats: any[];
  cols!: any[];

  // search params
  selectedPositions: FootballPosition[];
  selectedTeams: number[];
  selectedSeasons: number[] = [2024];

  constructor(private playersService: PlayersService,
    private http: HttpClient) {
    this.cols = [
      { field: 'year', header: 'Year' },
      { field: 'team.abbreviation', header: 'Team' },
      { field: 'player.name', header: 'Player' },
      { field: 'player.position', header: 'POS' },
      { field: 'games_played', header: 'GP' },
      { field: 'passing_yards', header: 'Pass Yds' },
      { field: 'passing_tds', header: 'Pass TDs' },
      { field: 'rushing_yards', header: 'Rush Yds' },
      { field: 'rushing_tds', header: 'Rush TDs' },
      { field: 'receptions', header: 'Rec' },
      { field: 'receiving_yards', header: 'Rec Yds' },
      { field: 'receiving_tds', header: 'Rec TDs' },
      { field: 'fgm0_19', header: 'FG 0-19 ' },
      { field: 'fgm20_39', header: 'FG 20-39 ' },
      { field: 'fgm40_49', header: 'FGM 40-49' },
      { field: 'fgm50_plus', header: 'FGM 50+' },
      { field: 'fga', header: 'FGA' },
    ];   
  }

  ngOnInit() {
    this.playersService.getSeasonStats("2024").subscribe(
      data => {
        this.season_stats = data
      },
      error => {
        console.error('Error fetching player data!', error);
      }
    );
  }

  search(): void {
    const url = 'http://localhost:8000/api/stats/search/'; // The endpoint URL
    const body = {
      selectedPositions: this.selectedPositions,
      selectedTeams: this.selectedTeams,
      selectedSeasons: this.selectedSeasons
    };

    this.http.post<any[]>(url, body).subscribe(
        data => {
          this.season_stats = [...data];
        },
        error => {
          console.error('Error fetching player data!', error);
        }
    );
  }
}
