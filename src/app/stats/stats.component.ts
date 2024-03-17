import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';
import { PositionSelectorComponent } from '../position-selector/position-selector.component';
import { PlayersService } from '../players/players.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule, PositionSelectorComponent, RouterLink],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  season_stats: any[];

  cols!: any[];

  constructor(private playersService: PlayersService) {
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
      { field: 'fgm', header: 'FGM ' },
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
}
