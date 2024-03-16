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
  players: any = [];

  playersDict: PlayersPositionDictionary = {
    QB: [],
    RB: [],    
  };

  ngOnInit() {
    // Get the player season list
    
    this.playersService.getAllPlayers().subscribe(
      data => {
        this.playersDict = this.createPositionDictionary(data);
      },
      error => {
        console.error('Error fetching player data!', error);
      }
    );
  }

  createPositionDictionary(players: Player[]): PlayersPositionDictionary {
    return players.reduce((acc: PlayersPositionDictionary, current: Player) => {
      // Initialize the position array if it does not exist
      if (!acc[current.position]) {
        acc[current.position] = [];
      }
      // Push the current player into the appropriate position array
      acc[current.position].push(current);
      return acc;
    }, {});
  }
}
