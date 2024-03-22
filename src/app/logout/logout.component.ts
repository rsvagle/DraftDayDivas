import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'logout',
  standalone: true,
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  private authService = inject(AuthService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }
}
