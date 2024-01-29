import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';
import { PositionSelectorComponent } from '../position-selector/position-selector.component';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule, PositionSelectorComponent],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {

}
