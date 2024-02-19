import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileService } from './profile.service';
import { PrimeNgLightModule } from '../primeng.light.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [PrimeNgLightModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  model: any;

  constructor(private http: HttpClient,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.model = this.profileService.getProfile().subscribe({
      next: (data: any) => this.model = JSON.stringify(data),
      error: (error: any) => console.error('There was an error!', error)
    });
  }

}
