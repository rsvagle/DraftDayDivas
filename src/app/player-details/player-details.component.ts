import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from '../players/players.service';
import { PlayerSummaryComponent } from '../player-summary/player-summary.component';
import { PrimeNgLightModule } from '../primeng.light.module';

@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [PlayerSummaryComponent, PrimeNgLightModule, CommonModule],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.scss'
})
export class PlayerDetailsComponent {
  player_id: number;
  player_summary: any;
  player_seasons: any;
  cols: any = [];

  constructor(
      private route: ActivatedRoute,
      private playersService: PlayersService
    ) {
    this.player_id = +this.route.snapshot.paramMap.get('player_id')!;

    this.cols = [
      { field: 'first_name', header: 'First Name' },
      { field: 'last_name', header: 'Last Name' },
      { field: 'position', header: 'Position' },
      { field: 'team_name', header: 'Team Name' },
      { field: 'games_played', header: 'GP' },
      { field: 'games_started', header: 'GS' },
      { field: 'passing_yards', header: 'Passing Yards' },
      { field: 'passing_tds', header: 'Passing TDs' },
      { field: 'rushing_yards', header: 'Rushing Yards' },
      { field: 'rushing_tds', header: 'Rushing TDs' },
      { field: 'receiving_yards', header: 'Receiving Yards' },
      { field: 'receiving_tds', header: 'Receiving TDs' },
      { field: 'field_goals_made', header: 'Field Goals Made' },
      { field: 'field_goals_attempted', header: 'Field Goals Attempted' },
      { field: 'fantasy_points', header: 'Fantasy Points' }
    ];    
  }

  ngOnInit() {
    // Get the player season list
    // if (this.player_id) {
    //   this.playersService.getPlayerSeasons(this.player_id).subscribe(
    //     data => {
    //       this.player_seasons = data;
    //     },
    //     error => {
    //       console.error('Error fetching player data!', error);
    //     }
    //   );
    // }

    if (this.player_id){
      this.player_seasons = this.playersService.getPlayerSeasonsFE(this.player_id);
    }

    // Get the player recent gamelogs

    // Get any news or injury reports related to this player

  }
}
