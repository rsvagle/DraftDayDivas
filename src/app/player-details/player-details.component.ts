import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from '../players/players.service';
import { PlayerSummaryComponent } from '../player-summary/player-summary.component';
import { PrimeNgLightModule } from '../primeng.light.module';
import { NewsService } from '../news/news.service';
import { InjuryReportService } from '../injury-report/injury-report-service';
import { PlayerStatsDisplayComponent } from '../player-stats-display/player-stats-display.component';

@Component({
  selector: 'player-details',
  standalone: true,
  imports: [
    PlayerSummaryComponent,
    PrimeNgLightModule,
    CommonModule,
    PlayerStatsDisplayComponent,
  ],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.scss',
})
export class PlayerDetailsComponent {
  newsService = inject(NewsService);
  injuryService = inject(InjuryReportService);

  player_id: number;

  player: any;
  player_seasons: any;
  injuryReports: any;
  newsItems: any;

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
