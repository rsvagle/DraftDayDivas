import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Assuming these interfaces are in a separate file, import them
import { UserCredentials, LoggedInUser } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<LoggedInUser | null>;
  public currentUser: Observable<LoggedInUser | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoggedInUser | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoggedInUser | null {
    return this.currentUserSubject.value;
  }

  login(credentials: UserCredentials): Observable<LoggedInUser> {
    return this.http.post<LoggedInUser>(`http://localhost:8000/api/login/`, credentials)
      .pipe(map(user => {
        // Assuming the server responds with the LoggedInUser format
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('authToken', user.token);
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}
