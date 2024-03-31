import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';

@Component({
  selector: 'scoring-selector',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule],
  templateUrl: './scoring-selector.component.html',
  styleUrl: './scoring-selector.component.scss'
})
export class ScoringSelectorComponent {
  @Input() scoringParams: ScoringParams = ScoringParams.PPR;
  @Output() scoringParamsChange = new EventEmitter<ScoringParams>();
  
  scoringOptions: any[] = [];
  
  ngOnInit(): void{
    this.scoringOptions = [
      { name: 'PPR', value: ScoringParams.PPR },
      { name: '1/2 PPR', value: ScoringParams.HalfPPR },
      { name: 'Standard', value: ScoringParams.Standard },
    ];
  }

  onScoringParamsChange(): void {
    this.scoringParamsChange.emit(this.scoringParams);
  }
}
  
export enum ScoringParams{
  PPR = 1,
  HalfPPR = 2,
  Standard = 3
}