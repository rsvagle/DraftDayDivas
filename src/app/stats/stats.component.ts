import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';
import { PositionSelectorComponent } from '../position-selector/position-selector.component';
import { PlayersService } from '../players/players.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule, PositionSelectorComponent],
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
      { field: 'games_played', header: 'GP' },
      { field: 'passing_yards', header: 'Passing Yards' },
      { field: 'passing_tds', header: 'Passing TDs' },
      { field: 'rushing_yards', header: 'Rushing Yards' },
      { field: 'rushing_tds', header: 'Rushing TDs' },
      { field: 'receptions', header: 'Receptions' },
      { field: 'receiving_yards', header: 'Receiving Yards' },
      { field: 'receiving_tds', header: 'Receiving TDs' },
      { field: 'fgm', header: 'Field Goals Made' },
      { field: 'fga', header: 'Field Goals Attempted' },
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
