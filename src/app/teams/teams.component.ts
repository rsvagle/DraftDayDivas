import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PrimeNgLightModule } from '../primeng.light.module';
import { TeamsService } from './teams.service';
import { FootballTeam } from './team.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'teams',
  standalone: true,
  imports: [CommonModule, PrimeNgLightModule, RouterLink],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent {
  teamsService = inject(TeamsService);
  teams: FootballTeam[] = [];

  ngOnInit(): void {
    this.teamsService.getTeams().subscribe({
      next: (data) => this.teams = data,
      error: (error) => console.error('There was an error!', error)
    });
  }  
}
