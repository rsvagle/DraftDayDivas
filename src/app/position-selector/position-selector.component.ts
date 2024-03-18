import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FootballPosition } from '../globals';
import { CommonModule } from '@angular/common';
import { PrimeNgLightModule } from '../primeng.light.module';

@Component({
  selector: 'position-selector',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule],
  styleUrl: './position-selector.component.scss',
  templateUrl: './position-selector.component.html'
})
export class PositionSelectorComponent implements OnInit {
  @Input() includeKicker: boolean = true;

  @Input() selectedPositions: FootballPosition[] = [];
  @Output() selectedPositionsChange = new EventEmitter<FootballPosition[]>();

  positions: FootballPosition[] = [FootballPosition.QB, FootballPosition.RB, FootballPosition.WR, FootballPosition.TE];

  ngOnInit(): void {
    if (this.includeKicker) {
      this.positions.push(FootballPosition.K);
    }
  }

  onPositionChange(): void {
    this.selectedPositionsChange.emit(this.selectedPositions);
  }
}