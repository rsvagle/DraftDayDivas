import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { CommonModule } from '@angular/common';
import { PrimeNgLightModule } from '../primeng.light.module';

@Component({
  selector: 'player-summary',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule],
  templateUrl: './player-summary.component.html',
  styleUrl: './player-summary.component.scss'
})
export class PlayerSummaryComponent implements OnInit {
  @Input() playerId: number = 0;
  player: any; // You should create an interface to type this properly

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    if (this.playerId) {
      this.playerService.getPlayerSummary(this.playerId).subscribe(
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