import { Component, inject } from '@angular/core';
import { PlayersService } from '../players/players.service';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [],
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.scss'
})
export class RankingsComponent {
  playersService = inject(PlayersService);
  players: any;

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
      },
      error => {
        console.error('Error fetching player data!', error);
      }
    );
  }  
}
