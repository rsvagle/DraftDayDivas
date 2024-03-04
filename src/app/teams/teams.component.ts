import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';
import { TeamsService } from './teams.service';
import { FootballTeam } from './team.model';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent {
  teamsService = inject(TeamsService);
  teams: FootballTeam[] = [];

  ngOnInit(): void {
    // pull from backend
    this.teamsService.getTeams().subscribe({
      next: (data) => this.teams = data,
      error: (error) => console.error('There was an error!', error)
    });
  }  
}
