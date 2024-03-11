import { Component, inject } from '@angular/core';
import { PlayersService } from './players.service';
import { PrimeNgLightModule } from '../primeng.light.module';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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

  ngOnInit() {
    // Get the player season list
    
      this.playersService.getAllPlayers().subscribe(
        data => {
          this.players = data;
        },
        error => {
          console.error('Error fetching player data!', error);
        }
      );
   }
}
