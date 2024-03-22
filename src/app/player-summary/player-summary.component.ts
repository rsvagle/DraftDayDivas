import { Component, Input, OnInit } from '@angular/core';
import { PlayersService } from '../players/players.service';
import { CommonModule } from '@angular/common';
import { PrimeNgLightModule } from '../primeng.light.module';
import { Player } from '../players/player.model';

@Component({
  selector: 'player-summary',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule],
  templateUrl: './player-summary.component.html',
  styleUrl: './player-summary.component.scss'
})
export class PlayerSummaryComponent implements OnInit {
  @Input() player_id: number = 0;

  player: Player;

  constructor(
    private playersService: PlayersService
  ) {}

  ngOnInit() {
    if (this.player_id) {
      this.playersService.getPlayerSummary(this.player_id).subscribe(
        data => {
          this.player = data;
        },
        error => {
          console.error('Error fetching player data!', error);
        }
      );
    }
  }
}