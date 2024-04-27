import { Component, Input, inject } from '@angular/core';
import { GameLogsService } from '../game-logs/game-logs.service';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'recent-fantasy-scores',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './recent-fantasy-scores.component.html',
  styleUrl: './recent-fantasy-scores.component.scss'
})
export class RecentFantasyScoresComponent {
  @Input() player_id: number;
  @Input() chartHeight: string = "250";
  gameLogsService = inject(GameLogsService);
  gameLogs: any;
  recentGamesChartoptions: any;
  recentGamesData: any;

  ngOnInit(){
    // Get the player recent gamelogs
    if (this.player_id) {
      this.gameLogsService.getRecentPlayerGameLogs(this.player_id).subscribe(
        (data) => {
          // Calculate game log data
          this.gameLogs = data;
          this.recentGamesData = this.calculateGameData(data);
        },
        (error) => {
          console.error('Error fetching game logs data!', error);
        }
      );
    }

    this.recentGamesChartoptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
          legend: {
              labels: {
                  color: "#000000"
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: "#000000",
                  font: {
                      weight: 500
                  }
              },
              grid: {
                  color: "#d7d7d7",
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: "#000000"
              },
              grid: {
                  color: "#d7d7d7",
                  drawBorder: false
              }
          }

      }
    };
  }


  calculateGameData(gameLogs: any[]): any {
    gameLogs.forEach(gameLog => {
      this.calculateFantasyPoints(gameLog);
    })

    // Sort by week
    gameLogs.sort((a,b) => a.week - b.week);

    let gameData = {
      labels: [] as string[],
      datasets: [] as any[]
    };
  
    let dataset = {
      label: 'Fantasy Points',
      backgroundColor: gameLogs[0].team.team_color_primary,
      borderColor: gameLogs[0].team.team_color_primary,
      data: [] as number[]
    };
  
    // put the data into the chart
    gameLogs.forEach((gameLog: any) => {
      gameData.labels.push("Week " + gameLog.week);
      dataset.data.push(gameLog.points);
    });
  
    gameData.datasets.push(dataset);
  
    // return gameData
    return gameData;
  }

  calculateFantasyPoints(gameLog: any): number {
    let fantasyPoints = 0;

    fantasyPoints += (gameLog.passing_yards * 0.04);
    fantasyPoints += (gameLog.passing_tds * 4);
    fantasyPoints += (gameLog.rushing_yards * 0.1);
    fantasyPoints += (gameLog.rushing_tds * 6);
    fantasyPoints += (gameLog.receiving_yards * 0.1);
    fantasyPoints += (gameLog.receiving_tds * 6);

    fantasyPoints += (gameLog.ints * -1);
    fantasyPoints += (gameLog.fumbles_lost * -1);

    fantasyPoints += (gameLog.xpm * 1);
    fantasyPoints += (gameLog.fgm0_19 * 3);
    fantasyPoints += (gameLog.fgm20_39 * 3);
    fantasyPoints += (gameLog.fgm40_49 * 4);
    fantasyPoints += (gameLog.fgm50_plus * 5);

    gameLog.points = fantasyPoints;

    return fantasyPoints;
  }
}
