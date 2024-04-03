import { Component, inject } from '@angular/core';
import { PlayersService } from '../players/players.service';
import { CommonModule } from '@angular/common';
import { PrimeNgLightModule } from '../primeng.light.module';

@Component({
  selector: 'top-players',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule],
  templateUrl: './top-players.component.html',
  styleUrl: './top-players.component.scss'
})
export class TopPlayersComponent {
  playersService = inject(PlayersService);
  players: any;
  show: boolean = false;

  topQB: any;
  topRB: any;
  topWR: any;
  topTE: any;
  topK: any;

  ngOnInit(): void{
    this.playersService.getTopPerformers().subscribe(
      data => {
        this.players = data;
        this.topQB = data["QB"]
        this.topRB = data["RB"]
        this.topWR = data["WR"]
        this.topTE = data["TE"]
        this.topK = data["K"]

        this.players = [this.topQB, this.topRB, this.topWR, this.topTE, this.topK]

        this.show = true;
      },
      error => {
        console.error('Error fetching player data!', error);
      }
    );
  }  
}
