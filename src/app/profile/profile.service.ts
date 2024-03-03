import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:8000/api/profile/';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  postSaveProfile(data: any): Observable<any>{
    return this.http.post("http://localhost:8000/api/save_profile/", data);
  }
}
