import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameLogsTableComponent } from '../game-logs-table/game-logs-table.component';
import { PlayerSummaryComponent } from '../player-summary/player-summary.component';

@Component({
  selector: 'game-logs',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule, RouterLink, GameLogsTableComponent, PlayerSummaryComponent],
  templateUrl: './game-logs.component.html',
  styleUrl: './game-logs.component.scss'
})
export class GameLogsComponent {

  player_id: any;
  gameLogs: any;

  constructor(
    private route: ActivatedRoute
  ) {
    this.player_id = +this.route.snapshot.paramMap.get('player_id')!;
  }


}
