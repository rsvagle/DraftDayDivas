import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseDevUrl } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = baseDevUrl + 'profile/';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  postSaveProfile(data: any): Observable<any>{
    return this.http.post(this.apiUrl + "save_profile/", data);
  }
}
