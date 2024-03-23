import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'game-logs-table',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule, RouterLink],
  templateUrl: './game-logs-table.component.html',
  styleUrl: './game-logs-table.component.scss'
})
export class GameLogsTableComponent {
  @Input() gameLogs: any[];

  positionPlayerCols: any[];
  kickerCols: any[];
  oPlayerGameLogs: any[];
  kPlayerGameLogs: any[];

  constructor(){
    this.positionPlayerCols = [
      { field: 'year', header: 'Year' },
      { field: 'week', header: 'Wk' },   
      { field: 'opponent', header: 'Opponent' },
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
      { field: 'week', header: 'Wk' },    
      { field: 'opponent', header: 'Opponent' },
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
    this.oPlayerGameLogs = this.gameLogs.filter(x => x.fga == 0 && x.xpa == 0);
    this.kPlayerGameLogs = this.gameLogs.filter(x => x.fga > 0 || x.xpa > 0)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['gameLogs']) {
      // Data in gameLogs has changed
      this.gameLogs = [...this.gameLogs]
      this.oPlayerGameLogs = this.gameLogs.filter(x => x.fga == 0 && x.xpa == 0);
      this.kPlayerGameLogs = this.gameLogs.filter(x => x.fga > 0 || x.xpa > 0)
    }
  }
}
