import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameLogsTableComponent } from '../game-logs-table/game-logs-table.component';
import { PlayerSummaryComponent } from '../player-summary/player-summary.component';
import { GameLogsService } from './game-logs.service';

@Component({
  selector: 'game-logs',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule, RouterLink, GameLogsTableComponent, PlayerSummaryComponent],
  templateUrl: './game-logs.component.html',
  styleUrl: './game-logs.component.scss'
})
export class GameLogsComponent {
  gameLogsService = inject(GameLogsService);

  player_id: any;
  gameLogs: any[] = [];

  constructor(
    private route: ActivatedRoute
  ) {
    this.player_id = +this.route.snapshot.paramMap.get('player_id')!;
  }  

  ngOnInit(): void {
    this.gameLogsService.getPlayerGameLogs(this.player_id, 2024).subscribe({
      next: (data) => (this.gameLogs = data),
      error: (error) => console.error('There was an error!', error),
    });
  }

}
