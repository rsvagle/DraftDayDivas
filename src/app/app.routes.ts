import { Routes } from '@angular/router';
import { StatsComponent } from './stats/stats.component';
import { RankingsComponent } from './rankings/rankings.component';
import { NewsComponent } from './news/news.component';
import { InjuryReportComponent } from './injury-report/injury-report.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'injury-report', component: InjuryReportComponent },
    { path: 'news', component: NewsComponent },
    { path: 'rankings', component: RankingsComponent },
    { path: 'stats', component: StatsComponent },
];
