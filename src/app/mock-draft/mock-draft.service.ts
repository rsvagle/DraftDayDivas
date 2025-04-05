import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseDevUrl } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class MockDraftService {
  private apiUrl = baseDevUrl + 'mock-draft/';

  constructor(private http: HttpClient) { }

  getAvailableDrafts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getMyDrafts(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "joined/");
  }

  getMyDraftResults(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  postJoinDraft(data: any): Observable<any>{
    return this.http.post<any>(this.apiUrl + "join", data);
  }

  postCreateDraft(data: any): Observable<any>{
    return this.http.post<any>(this.apiUrl, { data: data });
  }

  postLaunchDraft(data: any): Observable<any>{
    return this.http.post<any>(this.apiUrl, { data: data });
  }
}