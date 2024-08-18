import { Component } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mock-drafts',
  standalone: true,
  imports: [PrimeNgLightModule, CommonModule],
  templateUrl: './mock-draft.component.html',
  styleUrl: './mock-draft.component.scss',
})
export class DraftComponent {
  selectedDraftPosition: number;

  draftPositionOptions: any[] = [
    { name: 'Random', key: 99 },
    { name: '1', key: 1 },
    { name: '2', key: 2 },
    { name: '3', key: 3 },
    { name: '4', key: 4 },
    { name: '5', key: 5 },
    { name: '6', key: 6 },
    { name: '7', key: 7 },
    { name: '8', key: 8 },
    { name: '9', key: 9 },
    { name: '10', key: 10 },
  ];

  ngOnInit(): void{
    this.selectedDraftPosition = this.draftPositionOptions[0];
  }

  launchDraft(): void {
    // give backend request to start draft

    // get back id of newly initialized mock draft

    // navigate to the new mock draft in a new window
    
  }
}
