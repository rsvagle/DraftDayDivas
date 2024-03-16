import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from '../players/players.service';
import { PlayerSummaryComponent } from '../player-summary/player-summary.component';
import { PrimeNgLightModule } from '../primeng.light.module';
import { NewsService } from '../news/news.service';
import { InjuryReportService } from '../injury-report/injury-report-service';

@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [PlayerSummaryComponent, PrimeNgLightModule, CommonModule],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.scss'
})
export class PlayerDetailsComponent {
  newsService = inject(NewsService);
  injuryService = inject(InjuryReportService);

  player_id: number;
  player: any;
  player_seasons: any;
  cols: any = [];
  kickerCols: any = [];
  positionPlayerCols: any = [];

  jsonPlayer: any;

  injuryReports: any;
  newsItems: any;

  constructor(
      private route: ActivatedRoute,
      private playersService: PlayersService
    ) {
    this.player_id = +this.route.snapshot.paramMap.get('player_id')!;

    this.positionPlayerCols = [
      { field: 'year', header: 'Year' },
      { field: 'team.abbreviation', header: 'Team' },
      { field: 'player.position', header: 'Position' },
      { field: 'games_played', header: 'GP' },
      { field: 'passing_yards', header: 'Passing Yards' },
      { field: 'passing_tds', header: 'Passing TDs' },
      { field: 'rushing_yards', header: 'Rushing Yards' },
      { field: 'rushing_tds', header: 'Rushing TDs' },
      { field: 'receptions', header: 'Receptions' },
      { field: 'receiving_yards', header: 'Receiving Yards' },
      { field: 'receiving_tds', header: 'Receiving TDs' },
    ];

    this.kickerCols = [
      { field: 'year', header: 'Year' },
      { field: 'team.abbreviation', header: 'Team' },
      { field: 'player.position', header: 'Position' },
      { field: 'games_played', header: 'GP' },
      { field: 'fgm0_19', header: 'FG 0-19' },
      { field: 'fgm20_39', header: 'FG 20-39' },
      { field: 'fgm40_49', header: 'FG 40-49' },
      { field: 'fgm50_plus', header: 'FG 50+' },
      { field: 'fga', header: 'FGs Attempted' },
      { field: 'xpm', header: 'XPs Made' },
      { field: 'xpa', header: 'XPs Attempted' },
    ];
  }

  ngOnInit() {
    // Get the player season list
    if (this.player_id) {
      this.playersService.getPlayerAllSeasons(this.player_id).subscribe(
        data => {
          this.player = data
          this.player_seasons = data.seasons;
          this.jsonPlayer = JSON.stringify(data)

          if(this.player.position == "K"){
            this.cols = this.kickerCols;
          }
          else{
            this.cols = this.positionPlayerCols;
          }
        },
        error => {
          console.error('Error fetching player data!', error);
        }
      );
    }
    // Get the player recent gamelogs

    // Get any news or injury reports related to this player
    if(this.player_id) {
      this.injuryService.getAllInjuryReports(this.player_id).subscribe(
        data => {
          this.injuryReports = data
        },
        error => {
          console.error('Error fetching injury report data!', error);
        }
      );
    }

    if(this.player_id) {
      this.newsService.getPlayerNewsArticles(this.player_id).subscribe(
        data => {
          this.newsItems = data
        },
        error => {
          console.error('Error fetching news data!', error);
        }
      );
    }
  }
}
