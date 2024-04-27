import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlayersService } from '../players/players.service';
import { PlayerSummaryComponent } from '../player-summary/player-summary.component';
import { PrimeNgLightModule } from '../primeng.light.module';
import { NewsService } from '../news/news.service';
import { InjuryReportService } from '../injury-report/injury-report-service';
import { PlayerStatsDisplayComponent } from '../player-stats-display/player-stats-display.component';
import { GameLogsService } from '../game-logs/game-logs.service';
import { GameLogsTableComponent } from '../game-logs-table/game-logs-table.component';
import { RecentFantasyScoresComponent } from '../recent-fantasy-scores/recent-fantasy-scores.component';

@Component({
  selector: 'player-details',
  standalone: true,
  imports: [
    PlayerSummaryComponent,
    PrimeNgLightModule,
    CommonModule,
    PlayerStatsDisplayComponent,
    GameLogsTableComponent,
    RouterLink,   
    RecentFantasyScoresComponent
  ],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.scss',
})
export class PlayerDetailsComponent {
  newsService = inject(NewsService);
  injuryService = inject(InjuryReportService);
  gameLogsService = inject(GameLogsService);

  player_id: number;

  player: any;
  player_seasons: any;
  injuryReports: any;
  newsItems: any;
  gameLogs: any;

  constructor(
    private route: ActivatedRoute,
    private playersService: PlayersService
  ) {
    this.player_id = +this.route.snapshot.paramMap.get('player_id')!;
  }

  ngOnInit() {
    // Get the player season list
    if (this.player_id) {
      this.playersService.getPlayerAllSeasons(this.player_id).subscribe(
        (data) => {
          this.player = data;
          this.player_seasons = data.seasons;
        },
        (error) => {
          console.error('Error fetching player data!', error);
        }
      );
    }

    // Get the player recent gamelogs
    if (this.player_id) {
      this.gameLogsService.getRecentPlayerGameLogs(this.player_id).subscribe(
        (data) => {
          this.gameLogs = data;
        },
        (error) => {
          console.error('Error fetching game logs data!', error);
        }
      );
    }

    // Get injury reports related to this player
    if (this.player_id) {
      this.injuryService.getAllPlayerInjuryReports(this.player_id).subscribe(
        (data) => {
          this.injuryReports = data;
        },
        (error) => {
          console.error('Error fetching injury report data!', error);
        }
      );
    }

    // Get any news related to this player
    if (this.player_id) {
      this.newsService.getPlayerNewsArticles(this.player_id).subscribe(
        (data) => {
          this.newsItems = data;
        },
        (error) => {
          console.error('Error fetching news data!', error);
        }
      );
    }
  }
}
