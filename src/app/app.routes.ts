import { Routes } from '@angular/router';
import { StatsComponent } from './stats/stats.component';
import { RankingsComponent } from './rankings/rankings.component';
import { NewsComponent } from './news/news.component';
import { InjuryReportComponent } from './injury-report/injury-report.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { DraftComponent } from './draft/draft.component';
import { PlayersComponent } from './players/players.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { AuthGuard } from './auth/auth.gaurd';
import { LogoutComponent } from './logout/logout.component';
import { TeamsComponent } from './teams/teams.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'injury-report', component: InjuryReportComponent },
    { path: 'news', component: NewsComponent },
    { path: 'draft', component: DraftComponent },
    { path: 'rankings', component: RankingsComponent },
    { path: 'stats', component: StatsComponent },
    { path: 'players', component: PlayersComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'teams', component: TeamsComponent },
    { path: 'players/player-details/:player_id', component: PlayerDetailsComponent}
];

export const routes2: Routes = [
    {
      path: '',
      loadComponent: () => import('./app-layout/app-layout.component').then(res => res.AppLayoutComponent),
      children: [
        {
            path: '',
            loadComponent: () => import('./home/home.component').then(res => res.HomeComponent),
            title: ''
        },
        {
          path: 'home',
          loadComponent: () => import('./home/home.component').then(res => res.HomeComponent),
          title: 'Home'
        },
        {
          path: 'about',
          loadComponent: () => import('./about/about.component').then(res => res.AboutComponent),
          title: 'About'
        },
        {
            path: 'injury-report',
            loadComponent: () => import('./injury-report/injury-report.component').then(res => res.InjuryReportComponent),
            title: 'Injury Report'
        },
        {
            path: 'injury-report/:id',
            loadComponent: () => import('./injury-report-article/injury-report-article.component').then(res => res.InjuryReportArticleComponent),
            title: 'Injury Report'
        },
        {
            path: 'news',
            loadComponent: () => import('./news/news.component').then(res => res.NewsComponent),
            title: 'News'
        },
        {
          path: 'news/article/:id',
          loadComponent: () => import('./article/article.component').then(res => res.ArticleComponent),
          title: 'News Article'
        },
        {
            path: 'players',
            loadComponent: () => import('./players/players.component').then(res => res.PlayersComponent),
            canActivate: [AuthGuard],
            title: 'Players'
        },
        {
          path: 'player-details/:player_id',
          loadComponent: () => import('./player-details/player-details.component').then(res => res.PlayerDetailsComponent),
          title: 'Players'
        },
        {
            path: 'stats',
            loadComponent: () => import('./stats/stats.component').then(res => res.StatsComponent),
            title: 'Stats'
        },
        {
          path: 'teams',
          loadComponent: () => import('./teams/teams.component').then(res => res.TeamsComponent),
          title: 'Teams'
        },
        {
          path: 'teams/:team_id',
          loadComponent: () => import('./team-summary/team-summary.component').then(res => res.TeamSummaryComponent),
          title: 'Team Summary'
        },
        {
            path: 'rankings',
            loadComponent: () => import('./rankings/rankings.component').then(res => res.RankingsComponent),
            title: 'Rankings'
        },
        {
            path: 'draft',
            loadComponent: () => import('./draft/draft.component').then(res => res.DraftComponent),
            canActivate: [AuthGuard],
            title: 'Draft'
        },
        {
          path: 'profile',
          loadComponent: () => import('./profile/profile.component').then(res => res.ProfileComponent),
          canActivate: [AuthGuard],
          title: 'Profile'
        },
      ]
    },
    {
      path: 'login',
      loadComponent: () => import('./login/login.component').then(res => res.LoginComponent),
      title: 'Login'
    },
    {
        path: 'signup',
        loadComponent: () => import('./signup/signup.component').then(res => res.SignupComponent),
        title: 'Signup'
    },
    {
      path: 'logout',
      loadComponent: () => import('./logout/logout.component').then(res => res.LogoutComponent),
      title: 'Logout'
    },
    {
      path: '404',
      loadComponent: () => import('./four-oh-four/404.component').then(res => res.FourOhFourComponent),
      title: '404'
    },
  ];