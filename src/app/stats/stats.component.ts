import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';
import { PositionSelectorComponent } from '../position-selector/position-selector.component';
import { PlayersService } from '../players/players.service';
import { RouterLink } from '@angular/router';
import { TeamSelectorComponent } from '../team-selector/team-selector.component';
import { SeasonSelectorComponent } from '../season-selector/season-selector.component';
import { PlayerStatsDisplayComponent } from '../player-stats-display/player-stats-display.component';
import { FootballPosition, baseDevUrl } from '../globals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'stats',
  standalone: true,
  imports: [CommonModule,PrimeNgLightModule, PositionSelectorComponent, RouterLink,
    TeamSelectorComponent, SeasonSelectorComponent, PlayerStatsDisplayComponent],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  season_stats: any[];

  // search params
  selectedPositions: FootballPosition[];
  selectedTeams: number[];
  selectedSeasons: number[] = [2024]; // default to selecting the current year

  constructor(
    private playersService: PlayersService,
    private http: HttpClient,
  ) { }

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
    const url = baseDevUrl + 'stats/search/';

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
