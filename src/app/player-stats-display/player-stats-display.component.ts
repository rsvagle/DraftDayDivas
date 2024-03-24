import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'player-stats-display',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule, RouterLink],
  templateUrl: './player-stats-display.component.html',
  styleUrl: './player-stats-display.component.scss'
})
export class PlayerStatsDisplayComponent {
  @Input() playerSeasons: any[] = [];

  positionPlayerCols: any[];
  kickerCols: any[];
  oPlayerSeasons: any[] = [];
  kPlayerSeasons: any[] = [];

  constructor(){
    this.positionPlayerCols = [
      { field: 'year', header: 'Year' },
      { field: 'team.abbreviation', header: 'Team' },
      { field: 'player.name', header: 'Player' },
      { field: 'player.position', header: 'POS' },
      { field: 'games_played', header: 'GP' },
      { field: 'passing_yards', header: 'Passing Yards' },
      { field: 'passing_tds', header: 'Passing TDs' },
      { field: 'rushing_yards', header: 'Rushing Yards' },
      { field: 'rushing_tds', header: 'Rushing TDs' },
      { field: 'receptions', header: 'Receptions' },
      { field: 'receiving_yards', header: 'Receiving Yards' },
      { field: 'receiving_tds', header: 'Receiving TDs' },
    ];

    this.kickerCols = [
      { field: 'year', header: 'Year' },
      { field: 'team.abbreviation', header: 'Team' },
      { field: 'player.name', header: 'Player' },
      { field: 'player.position', header: 'POS' },
      { field: 'games_played', header: 'GP' },
      { field: 'fgm0_19', header: 'FG 0-19' },
      { field: 'fgm20_39', header: 'FG 20-39' },
      { field: 'fgm40_49', header: 'FG 40-49' },
      { field: 'fgm50_plus', header: 'FG 50+' },
      { field: 'fga', header: 'FGs Attempted' },
      { field: 'xpm', header: 'XPs Made' },
      { field: 'xpa', header: 'XPs Attempted' },
    ];
  }

  ngOnInit(): void{
    // filter
    if(this.playerSeasons.length > 0){
      this.oPlayerSeasons = this.playerSeasons.filter(x => x.fga == 0 && x.xpa == 0);
      this.kPlayerSeasons = this.playerSeasons.filter(x => x.fga > 0 || x.xpa > 0)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['playerSeasons']) {
      // Data in playerSeasons has changed
      this.playerSeasons = [...this.playerSeasons]

      if(this.playerSeasons.length > 0){
        this.oPlayerSeasons = this.playerSeasons.filter(x => x.fga == 0 && x.xpa == 0);
        this.kPlayerSeasons = this.playerSeasons.filter(x => x.fga > 0 || x.xpa > 0)
      }
    }
  }
}
