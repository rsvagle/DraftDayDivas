import { ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { PlayersService } from '../players/players.service';
import { TopPlayersComponent } from '../top-players/top-players.component';
import { RankingsService } from './rankings.service';
import { CommonModule } from '@angular/common';
import { PrimeNgLightModule } from '../primeng.light.module';
import { RouterLink } from '@angular/router';
import { Table } from 'primeng/table';
import { PositionSelectorComponent } from '../position-selector/position-selector.component';
import { FootballPosition } from '../globals';

@Component({
  selector: 'rankings',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule, TopPlayersComponent, RouterLink, PositionSelectorComponent],
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.scss'
})
export class RankingsComponent {
  @ViewChild('rankingsTable') rankingsTable: Table;
  
  playersService = inject(PlayersService);
  rankingsService = inject(RankingsService);

  selectedPositions: any;

  playerRankings: any[] = [];

  players: any;

  keys: any = {};

  topQB: any;
  topRB: any;
  topWR: any;
  topTE: any;
  topK: any;

  rankingsCols: any[];

  constructor(
    private ref: ChangeDetectorRef
  ){
    this.rankingsCols = [
      { field: 'ranking', header: 'Rank' },
      { field: 'name', header: 'Player' },
      { field: 'first_name', header: 'First', hidden: true }, // Hidden column used for search filtering
      { field: 'last_name', header: 'Last', hidden: true }, // Hidden column used for search filtering
      { field: 'position', header: 'POS' },
      { field: 'projected_points', header: 'Projected' },
    ];
  }

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

    this.rankingsService.getRankings().subscribe(
      data => {
        
        data.forEach((player, index) => {
          if(index == 0){
            this.keys[player.id] = true;
          }
          else{
            this.keys[player.id] = false;
          }
        });
        
        this.playerRankings = data;

      },
      error => {
        console.error('Error fetching rankings data!', error);
      }
    );
  }  

  filterGlobal(event: Event): void {
    const element = event.target as HTMLInputElement; // Correctly type the event target
    if (element) { // Check if element is present
      const value = element.value || ''; // Use an empty string if the value is null or undefined
      if (value === '') {
        this.rankingsTable.filterGlobal('', 'contains'); // This clears the global filter
      } else {
        // Apply the filter with the input value
        this.rankingsTable.filterGlobal(value, 'contains');
      }
    }
  }
  
  selectedPositionsChange(event: FootballPosition[]): void{
    this.selectedPositions = event;
    
    if (this.selectedPositions.length === 0) {
      this.rankingsTable.filter(null, 'position', 'contains'); // This clears the global filter
    } else {
      // Apply the filter with the input value
      this.rankingsTable.filter(this.selectedPositions, 'position', 'in');
    }
  }

  onItemClick(rowData:any, dt:any) {
    if(dt.expandedRowKeys[rowData.id]){
      dt.expandedRowKeys[rowData.id] = false;
    }
    else {
     dt.expandedRowKeys[rowData.id] = true;
    }
 }
}
