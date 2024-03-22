import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsService } from '../news/news.service';
import { InjuryReportService } from '../injury-report/injury-report-service';
import { PlayersService } from '../players/players.service';
import { PrimeNgLightModule } from '../primeng.light.module';
import { CommonModule } from '@angular/common';
import { TeamsService } from '../teams/teams.service';
import { PlayerStatsDisplayComponent } from '../player-stats-display/player-stats-display.component';
import { FootballTeam } from '../teams/team.model';

@Component({
  selector: 'app-team-summary',
  standalone: true,
  imports: [PrimeNgLightModule, CommonModule, RouterLink, PlayerStatsDisplayComponent],
  templateUrl: './team-summary.component.html',
  styleUrl: './team-summary.component.scss'
})
export class TeamSummaryComponent {
  newsService = inject(NewsService);
  injuryService = inject(InjuryReportService);
  playersService = inject(PlayersService);
  teamsService = inject(TeamsService);

  team: FootballTeam;
  team_id: number;
  playersList: any;
  playerStats: any = [];
  injuryReports: any;
  newsItems: any;
  cols: any = [];

  constructor(
    private route: ActivatedRoute
  ) {
    this.team_id = +this.route.snapshot.paramMap.get('team_id')!;
    this.cols = [
      { field: 'year', header: 'Year' },
      { field: 'team.abbreviation', header: 'Team' },
      { field: 'player.name', header: 'Player' },
      { field: 'player.position', header: 'POS' },
      { field: 'games_played', header: 'GP' },
      { field: 'passing_yards', header: 'Pass Yds' },
      { field: 'passing_tds', header: 'Pass TDs' },
      { field: 'rushing_yards', header: 'Rush Yds' },
      { field: 'rushing_tds', header: 'Rush TDs' },
      { field: 'receptions', header: 'Rec' },
      { field: 'receiving_yards', header: 'Rec Yds' },
      { field: 'receiving_tds', header: 'Rec TDs' },
      { field: 'fgm', header: 'FGM ' },
      { field: 'fga', header: 'FGA' },
    ]; 
  }

  ngOnInit() {
    if(this.team_id) {
      this.teamsService.getTeamSummary(this.team_id).subscribe(
        data => {
          this.team = data
        },
        error => {
          console.error('Error fetching injury report data!', error);
        }
      );
    }

    // Get any news or injury reports related to this player
    if(this.team_id) {
      this.playersService.getAllTeamPlayers(this.team_id).subscribe(
        data => {
          this.playersList = data
          this.playersList.forEach((x: { season_stats: any; }) => this.playerStats.push(x.season_stats))
        },
        error => {
          console.error('Error fetching injury report data!', error);
        }
      );
    }
  }
}
