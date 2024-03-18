import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';

@Component({
  selector: 'season-selector',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule],
  templateUrl: './season-selector.component.html',
  styleUrl: './season-selector.component.scss'
})
export class SeasonSelectorComponent {
  @Input() startingYear: number = 2010;
  @Input() endingYear: number = new Date().getFullYear();

  @Input() selectedSeasons: number[] = [];
  @Output() selectedSeasonsChange = new EventEmitter<number[]>();

  seasons: number[] = []

  constructor(){
  }
  
  ngOnInit(): void{
    for (let year = this.startingYear; year <= this.endingYear; year++) {
      this.seasons.push(year);
    }
  
    this.seasons.sort((a, b) => b - a);
  }

  onSeasonChange(): void {
    this.selectedSeasonsChange.emit(this.selectedSeasons);
  }
}
