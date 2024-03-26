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
  @Input() sorters: boolean = true;

  positionPlayerCols: any[];
  kickerCols: any[];
  oPlayerSeasons: any[] = [];
  kPlayerSeasons: any[] = [];

  constructor(){
    this.positionPlayerCols = [
      { field: 'year', header: 'Year' },
      { field: 'team.abbreviation', header: 'Team' },
      { field: 'player.name', header: 'Player' },
      { field: 'player.position', header: 'Pos' },
      { field: 'games_played', header: 'GP' },
      { field: 'passing_yards', header: 'Pass Yds' },
      { field: 'passing_tds', header: 'Pass TDs' },
      { field: 'rushing_yards', header: 'Rush Yds' },
      { field: 'rushing_tds', header: 'Rush TDs' },
      { field: 'receptions', header: 'Rec' },
      { field: 'receiving_yards', header: 'Rec Yds' },
      { field: 'receiving_tds', header: 'Rec TDs' },
    ];

    this.kickerCols = [
      { field: 'year', header: 'Year' },
      { field: 'team.abbreviation', header: 'Team' },
      { field: 'player.name', header: 'Player' },
      { field: 'player.position', header: 'Pos' },
      { field: 'games_played', header: 'GP' },
      { field: 'fgm0_19', header: 'FG 0-19' },
      { field: 'fgm20_39', header: 'FG 20-39' },
      { field: 'fgm40_49', header: 'FG 40-49' },
      { field: 'fgm50_plus', header: 'FG 50+' },
      { field: 'fga', header: 'FGs Att' },
      { field: 'xpm', header: 'XPs Made' },
      { field: 'xpa', header: 'XPs Att' },
    ];
  }

  ngOnInit(): void{
    // filter
    this.filterSeasonStats()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['playerSeasons']) {
      // Data in playerSeasons has changed
      this.playerSeasons = [...this.playerSeasons]
      this.filterSeasonStats()
    }
  }

  filterSeasonStats(){
    if(this.playerSeasons.length > 0){
      this.oPlayerSeasons = this.playerSeasons.filter(x => x.fga == 0 && x.xpa == 0);
      this.kPlayerSeasons = this.playerSeasons.filter(x => x.fga > 0 || x.xpa > 0)

      this.oPlayerSeasons.sort((a, b) => {
        // First, compare by passing_yards
        if (a.passing_yards !== b.passing_yards) {
          return b.passing_yards - a.passing_yards;
        }
        // If passing_yards are equal, compare by rushing_yards
        else if (a.rushing_yards !== b.rushing_yards) {
          return b.rushing_yards - a.rushing_yards;
        }
        // If rushing_yards are also equal, finally compare by receiving_yards
        else {
          return b.receiving_yards - a.receiving_yards;
        }
      });
    }
  }
}
