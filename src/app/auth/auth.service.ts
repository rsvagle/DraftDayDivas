import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserCredentials, LoggedInUser } from './auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<LoggedInUser | null>;
  public currentUser: Observable<LoggedInUser | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoggedInUser | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoggedInUser | null {
    return this.currentUserSubject.value;
  }

  // Login
  login(credentials: UserCredentials): Observable<LoggedInUser | any> {
    return this.http
      .post<LoggedInUser | any>(`http://localhost:8000/api/login/`, credentials)
      .pipe(
        map((user) => {
          // Assuming the server responds with the LoggedInUser format
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('authToken', user.token);
          this.currentUserSubject.next(user);
          return user;
        }),
        catchError((error) => {
          // Handle HTTP errors here
          throw error;
        })
      );
  }

  // Logout
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

  // Is Authenticated
  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}
