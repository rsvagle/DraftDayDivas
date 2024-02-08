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
  players!: any[];

  cols!: any[];

  constructor(private playersService: PlayersService) {}

  ngOnInit() {
      this.players = this.playersService.genericPlayers;

      this.cols = [
        { field: 'first_name', header: 'First Name' },
        { field: 'last_name', header: 'Last Name' },
        { field: 'position', header: 'Position' },
        { field: 'team_name', header: 'Team Name' },
        { field: 'season_passing_yards', header: 'Season Passing Yards' },
        { field: 'season_passing_tds', header: 'Season Passing TDs' },
        { field: 'season_rushing_yards', header: 'Season Rushing Yards' },
        { field: 'season_rushing_tds', header: 'Season Rushing TDs' },
        { field: 'season_receiving_yards', header: 'Season Receiving Yards' },
        { field: 'season_receiving_tds', header: 'Season Receiving TDs' },
        { field: 'season_field_goals_made', header: 'Season Field Goals Made' },
        { field: 'season_field_goals_attempted', header: 'Season Field Goals Attempted' },
        { field: 'season_fantasy_points', header: 'Season Fantasy Points' }
    ];    
  }
}
