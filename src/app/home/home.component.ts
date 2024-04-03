import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NewsArticle } from '../news/news.article.model';
import { NewsService } from '../news/news.service';
import { PrimeNgLightModule } from '../primeng.light.module';
import { PlayerSummaryComponent } from '../player-summary/player-summary.component';
import { TopPlayersComponent } from '../top-players/top-players.component';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNgLightModule,
    PlayerSummaryComponent,
    TopPlayersComponent,
    RouterLink,
    TruncatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  // Top news articles
  newsService = inject(NewsService);
  articles: NewsArticle[] = [];
  loading: boolean = false;

  title = 'DraftDayDivas';

  // Random player for "Player Highlight"
  randomPlayer: number;

  constructor() {
    // Generate a random player id to pass in
    this.randomPlayer = Math.floor(Math.random() * 100) + 1;
  }

  ngOnInit(): void {
    // Get the top 10 news articles
    this.loading = true;
    this.newsService.getNews(10).subscribe(
      data => {
        this.articles = data;
        this.loading = false;
      },
      error => {
        console.error('There was an error!', error);
        this.loading = false;
      }
    );
  }
}
