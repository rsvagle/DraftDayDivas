import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AppLayoutService } from './app-layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './app-layout.component.html',
  imports: [CommonModule, RouterOutlet, RouterLink],
  providers: [AuthService],
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    private appLayoutService: AppLayoutService,
    private authService: AuthService
  ) { 
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  // Recheck if there is a user
  checkUserStatus(): void{
    this.isLoggedIn = this.authService.isAuthenticated();
  }
}
