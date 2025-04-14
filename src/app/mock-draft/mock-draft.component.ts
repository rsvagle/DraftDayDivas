import { Component, inject } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';
import { CommonModule } from '@angular/common';
import { MockDraftService } from './mock-draft.service';
import { Router } from '@angular/router';
import { AppLayoutService } from '../app-layout/app-layout.service';

@Component({
  selector: 'mock-drafts',
  standalone: true,
  imports: [PrimeNgLightModule, CommonModule],
  templateUrl: './mock-draft.component.html',
  styleUrl: './mock-draft.component.scss',
})
export class DraftComponent {
  selectedDraftPosition: any;
  selectedDraftOption: any;
  teamName: string = "";
  
  // Dialog visibility controls
  createDraftDialogVisible: boolean = false;
  joinDraftDialogVisible: boolean = false;
  launchDraftDialogVisible: boolean = false;
  
  // Create Draft form data
  createDraftNumTeams: number;
  createDraftTeamName: string = "";
  createDraftPosition: any;
  
  // Join Draft form data
  selectedDraftToJoin: any;
  availDraftPositionOptions: any[] = [];
  joinDraftTeamName: string = "";
  joinDraftPosition: any;
  
  // Launch Draft data
  selectedJoinedDraft: any;

  availableDrafts: any[] = [];
  joinedDrafts: any[] = [];

  mockDraftService = inject(MockDraftService);
  appLayoutService = inject(AppLayoutService);

  newDraftTeamsOptions: any[] = [
    { name: '8', key: 8 },
    { name: '10', key: 10 },
    { name: '12', key: 12 },
  ];

  // This should be dynamically pulled based on the number of teams in the selected draft
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
    { name: '11', key: 11 },
    { name: '12', key: 12 },
  ];

  constructor(private router: Router) {  }

  ngOnInit(): void{
    this.selectedDraftPosition = this.draftPositionOptions[0];
    this.getAvailableDrafts();
    this.getJoinedDrafts();
  }

  // Get the drafts a user could join
  getAvailableDrafts(): void{
    this.mockDraftService.getAvailableDrafts().subscribe({
      next: (data) => (this.availableDrafts = data),
      error: (error) => console.error('There was an error!', error),
    });
  }

  // This gets drafts a user could launch
  getJoinedDrafts(): void{
    this.mockDraftService.getMyDrafts().subscribe({
      next: (data) => {this.joinedDrafts = data},
      error: (error) => {
        
      },
    });
  }

  // Create a draft
  createDraft(): void {
    let data = {
      num_teams: this.createDraftNumTeams,
      team_name: this.createDraftTeamName,
      draft_position: this.createDraftPosition.key
    }

    this.mockDraftService.postCreateDraft(data).subscribe({
      next: (data) => {
        this.createDraftDialogVisible = false;
        this.getAvailableDrafts();
        this.getJoinedDrafts();
      },
      error: (error) => {
        console.error('There was an error!', error)
      },
    });
  }

  // Join a draft
  joinDraft(): void{

    let draft_position = this.joinDraftPosition.key;
    if(this.selectedDraftPosition.key == 99){
      // Randomly choose from available

    }

    let data = {
      draft_id: this.selectedDraftToJoin.id,
      team_name: this.joinDraftTeamName,
      draft_position: draft_position
    }

    this.mockDraftService.postJoinDraft(data).subscribe({
      next: (data) => {
        this.joinDraftDialogVisible = false;
        this.getJoinedDrafts();
      },
      error: (error) => {
        this.appLayoutService
      },
    });
  }

  launchDraft(): void {
    const draftUrl = window.location.origin + '/draft-lobby-demo/' + this.selectedJoinedDraft.id;
    window.open(draftUrl, '_blank');    
  }

  /// 
  showCreateDraftDialog(): void {
    this.createDraftNumTeams = 10;
    this.createDraftTeamName = "";
    this.createDraftPosition = this.draftPositionOptions[0];
    this.createDraftDialogVisible = true;
  }

  showJoinDraftDialog(): void {
    this.availDraftPositionOptions = [
      { name: 'Random', key: 99 }
    ];

    // set available options
    for(let i = 1; i <= this.selectedDraftToJoin.number_teams; i++){
      if(this.selectedDraftToJoin.draft_teams.findIndex((x: { draft_position: number; }) => x.draft_position == i) == -1){
        this.availDraftPositionOptions.push({ name: i.toString(), key: i});
      }
    }

    this.joinDraftTeamName = "";
    this.joinDraftPosition = this.availDraftPositionOptions[0];
    this.joinDraftDialogVisible = true;
  }

  showLaunchDraftDialog(): void {
    this.launchDraftDialogVisible = true;
  }
}
