import { Component, ViewChild, inject } from '@angular/core';
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
  // Pull in table for filtering
  @ViewChild('rankingsTable') rankingsTable: Table;
  
  playersService = inject(PlayersService);
  rankingsService = inject(RankingsService);
  
  // table
  keys: any = {};
  rankingsCols: any[];
  playerRankings: any[] = [];
  selectedPositions: any;
  
  constructor(){
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
    this.rankingsService.getRankings().subscribe(
      data => {
        // Set up expanded row keys and open the first row
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

  // Player search filter
  filterGlobal(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element) {
      const value = element.value || '';
      if (value === '') {
        this.rankingsTable.filterGlobal('', 'contains'); // This clears the global filter
      } else {
        // Apply the filter with the input value
        this.rankingsTable.filterGlobal(value, 'contains');
      }
    }
  }
  
  // Position filter
  selectedPositionsChange(event: FootballPosition[]): void{
    this.selectedPositions = event;
    
    if (this.selectedPositions.length === 0) {
      this.rankingsTable.filter(null, 'position', 'contains'); // This clears the global filter
    } else {
      // Apply the filter with the input value
      this.rankingsTable.filter(this.selectedPositions, 'position', 'in');
    }
  }

  // Row expansion helper
  onItemClick(rowData:any, dt:any) {
    if(dt.expandedRowKeys[rowData.id]){
      dt.expandedRowKeys[rowData.id] = false;
    }
    else {
     dt.expandedRowKeys[rowData.id] = true;
    }
 }
}
