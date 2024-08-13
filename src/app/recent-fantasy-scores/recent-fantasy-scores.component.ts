import { Component, Input, inject } from '@angular/core';
import { GameLogsService } from '../game-logs/game-logs.service';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { PrimeNgLightModule } from '../primeng.light.module';

@Component({
  selector: 'recent-fantasy-scores',
  standalone: true,
  imports: [CommonModule, ChartModule, PrimeNgLightModule],
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
  radarGamesData: any;
  radarChartoptions: any;
  
  statTotals: StatTotals = new StatTotals();

  chartMode: ChartMode = ChartMode.Last4;

  // html ref
  ChartMode = ChartMode;

  ngOnInit(){
    // Get the player recent gamelogs
    if (this.player_id) {
      this.gameLogsService.getRecentPlayerGameLogs(this.player_id).subscribe(
        (data) => {
          // Calculate game log data
          this.gameLogs = data;
          this.recentGamesData = this.calculateGameData(data);
          this.radarGamesData = this.calculateRadarData(data);
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

    this.radarChartoptions = {
      plugins: {
          legend: {
              labels: {
                  usePointStyle: true,
              }
          }
      }
  };
  }

  calculateRadarData(gameLogs: any[]): any {
    let radarData = {
      labels: [] as string[],
      datasets: [] = [{
        label: "",
        data: [] as number[]
      }]
    };

    this.statTotals = this.calculateStatTotals(gameLogs, this.statTotals);

    if(this.statTotals.PassingYards != 0){
      radarData.labels.push("Passing Yards");
      radarData.datasets[0].data.push(this.statTotals.PassingYards);
    }

    if(this.statTotals.PassingTDs != 0){
      radarData.labels.push("Passing TDs");
      radarData.datasets[0].data.push(this.statTotals.PassingTDs);
    }

    if(this.statTotals.RushingYards != 0){
      radarData.labels.push("Rushing Yards");
      radarData.datasets[0].data.push(this.statTotals.RushingYards);
    }

    if(this.statTotals.RushingTDs != 0){
      radarData.labels.push("Rushing TDs");
      radarData.datasets[0].data.push(this.statTotals.RushingTDs);
    }

    if(this.statTotals.ReceivingYards != 0){
      radarData.labels.push("Receiving Yards");
      radarData.datasets[0].data.push(this.statTotals.ReceivingYards);
    }

    if(this.statTotals.ReceivingTDs != 0){
      radarData.labels.push("Receiving TDs");
      radarData.datasets[0].data.push(this.statTotals.ReceivingTDs);
    }

    if(this.statTotals.XPs != 0){
      radarData.labels.push("XPs");
      radarData.datasets[0].data.push(this.statTotals.XPs);
    }

    if(this.statTotals.FGs != 0){
      radarData.labels.push("FGs");
      radarData.datasets[0].data.push(this.statTotals.FGs);
    }

    return radarData;
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

  changeChartToRadar(){
    this.chartMode = ChartMode.Radar;
  }

  changeChartToLast4(){
    this.chartMode = ChartMode.Last4;
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

  calculateStatTotals(gameLogs: any[], stats: StatTotals): StatTotals {

    gameLogs.forEach((gameLog: any) => {
      stats.PassingYards += (gameLog.passing_yards * 0.04);
      stats.PassingTDs += (gameLog.passing_tds * 4);
      stats.RushingYards += (gameLog.rushing_yards * 0.1);
      stats.RushingTDs += (gameLog.rushing_tds * 6);
      stats.ReceivingYards += (gameLog.receiving_yards * 0.1);
      stats.ReceivingTDs += (gameLog.receiving_tds * 6);
      
      stats.XPs += (gameLog.xpm * 1);
      stats.FGs += (gameLog.fgm0_19 * 3);
      stats.FGs += (gameLog.fgm20_39 * 3);
      stats.FGs += (gameLog.fgm40_49 * 4);
      stats.FGs += (gameLog.fgm50_plus * 5);

      // insert total points
      stats.TotalPoints += (gameLog.passing_yards * 0.04);
      stats.TotalPoints += (gameLog.passing_tds * 4);
      stats.TotalPoints += (gameLog.rushing_yards * 0.1);
      stats.TotalPoints += (gameLog.rushing_tds * 6);
      stats.TotalPoints += (gameLog.receiving_yards * 0.1);
      stats.TotalPoints += (gameLog.receiving_tds * 6);      
      stats.TotalPoints += (gameLog.xpm * 1);
      stats.TotalPoints += (gameLog.fgm0_19 * 3);
      stats.TotalPoints += (gameLog.fgm20_39 * 3);
      stats.TotalPoints += (gameLog.fgm40_49 * 4);
      stats.TotalPoints += (gameLog.fgm50_plus * 5);
    });

    return stats;
  }
}

export class StatTotals{
  PassingYards: number;
  PassingTDs: number;
  RushingYards: number;
  RushingTDs: number;
  ReceivingYards: number;
  ReceivingTDs: number;
  XPs: number;
  FGs: number;
  TotalPoints: number;

  constructor (){
    this.PassingYards = 0;
    this.PassingTDs = 0;
    this.RushingYards = 0;
    this.RushingTDs = 0;
    this.ReceivingYards = 0;
    this.ReceivingTDs = 0;
    this.XPs = 0;
    this.FGs = 0;
    this.TotalPoints = 0;
  }
}

export enum ChartMode{
  Last4,
  Radar
}
