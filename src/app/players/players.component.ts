import { Component, inject } from '@angular/core';
import { PlayersService } from './players.service';
import { PrimeNgLightModule } from '../primeng.light.module';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Player } from './player.model';
import { PlayersPositionDictionary } from './player.model';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [PrimeNgLightModule, CommonModule, RouterLink],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent {
  playersService = inject(PlayersService);
  players: Player[] = [];

  loading: boolean = false;

  playersDict: PlayersPositionDictionary = {
    QB: [],
    RB: [],
    WR: [],    
    TE: [],    
    K: [],
  };

  ngOnInit() {
    // Get the player season list
    this.loading = true;
    this.playersService.getAllPlayers().subscribe(
      data => {
        this.createPositionDictionary(data);
        this.loading = false;
      },
      error => {
        console.error('Error fetching player data!', error);
      }
    );
  }

  createPositionDictionary(players: Player[]): void {
    players.forEach(x => this.playersDict[x.position].push(x));
  }
}
