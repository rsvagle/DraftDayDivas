import { Component, inject } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';
import { CommonModule } from '@angular/common';
import { MockDraftService } from './mock-draft.service';

@Component({
  selector: 'mock-drafts',
  standalone: true,
  imports: [PrimeNgLightModule, CommonModule],
  templateUrl: './mock-draft.component.html',
  styleUrl: './mock-draft.component.scss',
})
export class DraftComponent {
  selectedDraftPosition: any;
  selectedDraftOption: number;
  teamName: string = "Test TeamName"

  availableDrafts: any;
  joinedDrafts: any;

  mockDraftService = inject(MockDraftService);

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
    this.getAvailableDrafts();
  }

  getAvailableDrafts(): void{
    this.mockDraftService.getAvailableDrafts().subscribe({
      next: (data) => (this.availableDrafts = data),
      error: (error) => console.error('There was an error!', error),
    });
  }

  getJoinedDrafts(): void{
    this.mockDraftService.getMyDrafts().subscribe({
      next: (data) => (this.joinedDrafts = data),
      error: (error) => console.error('There was an error!', error),
    });
  }

  createDraft(): void {
    this.mockDraftService.postCreateDraft(10).subscribe({
      next: (data) => (console.log("Created one!")),
      // Todo: After a draft is created, auto join it
      error: (error) => console.error('There was an error!', error),
    });
  }

  joinDraft(): void{

    let data = {
      draft_id: this.selectedDraftOption,
      team_name: this.teamName,
      draft_position: this.selectedDraftPosition.key
    }

    this.mockDraftService.postJoinDraft(data).subscribe({
      next: (data) => (console.log("Created one!")),
      // Todo: After a draft is created, auto join it
      error: (error) => console.error('There was an error!', error),
    });
  }

  launchDraft(): void {
    this.mockDraftService.postLaunchDraft(10).subscribe({
      next: (data) => (console.log("Created one!")),
      error: (error) => console.error('There was an error!', error),
    });
  }
}
