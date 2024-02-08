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
  topQB: any;
  topRB: any;
  topWR: any;
  topTE: any;
  topK: any;

  ngOnInit(): void{
    // Assuming filterByPosition correctly filters players by their position
    const qbs = this.playersService.filterByPosition(this.playersService.genericPlayers, "QB");

    // Use reduce to find the QB with the highest fantasy points
    this.topQB = qbs.reduce((prev: { season_fantasy_points: number; }, current: { season_fantasy_points: number; }) => {
      return (prev.season_fantasy_points > current.season_fantasy_points) ? prev : current;
    });

    // Assuming filterByPosition correctly filters players by their position
    const rbs = this.playersService.filterByPosition(this.playersService.genericPlayers, "RB");

    // Use reduce to find the QB with the highest fantasy points
    this.topRB = rbs.reduce((prev: { season_fantasy_points: number; }, current: { season_fantasy_points: number; }) => {
      return (prev.season_fantasy_points > current.season_fantasy_points) ? prev : current;
    });

    // Assuming filterByPosition correctly filters players by their position
    const wrs = this.playersService.filterByPosition(this.playersService.genericPlayers, "WR");

    // Use reduce to find the QB with the highest fantasy points
    this.topWR = wrs.reduce((prev: { season_fantasy_points: number; }, current: { season_fantasy_points: number; }) => {
      return (prev.season_fantasy_points > current.season_fantasy_points) ? prev : current;
    });

    // Assuming filterByPosition correctly filters players by their position
    const tes = this.playersService.filterByPosition(this.playersService.genericPlayers, "TE");

    // Use reduce to find the QB with the highest fantasy points
    this.topTE = tes.reduce((prev: { season_fantasy_points: number; }, current: { season_fantasy_points: number; }) => {
      return (prev.season_fantasy_points > current.season_fantasy_points) ? prev : current;
    });

    // Assuming filterByPosition correctly filters players by their position
    const ks = this.playersService.filterByPosition(this.playersService.genericPlayers, "K");

    // Use reduce to find the QB with the highest fantasy points
    this.topK = ks.reduce((prev: { season_fantasy_points: number; }, current: { season_fantasy_points: number; }) => {
      return (prev.season_fantasy_points > current.season_fantasy_points) ? prev : current;
    });
  }
}
