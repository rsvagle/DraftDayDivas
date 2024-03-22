import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';
import { TeamsService } from '../teams/teams.service';
import { FootballTeam } from '../teams/team.model';

@Component({
  selector: 'team-selector',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule],
  templateUrl: './team-selector.component.html',
  styleUrl: './team-selector.component.scss'
})
export class TeamSelectorComponent {
  teamsService = inject(TeamsService);

  @Input() selectedTeams: number[] = [];
  @Output() selectedTeamsChange = new EventEmitter<number[]>();

  teams: FootballTeam[] = [];

  ngOnInit(): void {
    this.teamsService.getTeams().subscribe({
      next: (data) => this.teams = data,
      error: (error) => console.error('There was an error!', error)
    });
  }  

  onTeamChange(): void {
    this.selectedTeamsChange.emit(this.selectedTeams);
  }
}
