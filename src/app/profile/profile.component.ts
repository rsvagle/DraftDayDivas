import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from './profile.service';
import { PrimeNgLightModule } from '../primeng.light.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [PrimeNgLightModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  model: any;
  
  constructor(
    private profileService: ProfileService
  ) { }
    
  ngOnInit(): void {
    this.model = this.profileService.getProfile().subscribe({
      next: (data: any) => this.model = data,
      error: (error: any) => console.error('There was an error!', error)
    });
  }
  
  saveProfile(): void {    
    this.profileService.postSaveProfile(this.model).subscribe({
      next: (data: any) => console.log('Success!'),
      error: (error: any) => console.error('There was an error!', error)
    });
  }
}
