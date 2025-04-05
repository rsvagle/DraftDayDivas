import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable, Subject, BehaviorSubject, timer } from 'rxjs';
import { catchError, retry, takeUntil, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DraftService {
  private socket$: WebSocketSubject<any>;
  private messagesSubject = new Subject<any>();
  private connectionStatus = new BehaviorSubject<boolean>(false);
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimer: any;
  private authToken: string | null;

  constructor() {
    this.authToken = localStorage.getItem('authToken');
  }

  connect(roomName: number) {
    this.socket$ = webSocket({
      url: `ws://127.0.0.1:8000/ws/draft/${roomName}/?token=${this.authToken}`,
      openObserver: {
        next: () => {
          console.log('WebSocket connection established');
          this.connectionStatus.next(true);
          this.reconnectAttempts = 0;
        }
      },
      closeObserver: {
        next: (event) => {
          console.log('WebSocket connection closed', event);
          this.connectionStatus.next(false);
          this.attemptReconnect(roomName);
        }
      }
    });

    this.socket$.pipe(
      catchError((error) => {
        console.error('WebSocket error:', error);
        return this.handleError(error);
      })
    ).subscribe(
      (message) => {
        this.messagesSubject.next(message);
      },
      (error) => {
        console.error('WebSocket subscription error:', error);
        this.attemptReconnect(roomName);
      }
    );
  }

  sendMessage(type: string, data: any) {
    if (!this.socket$ || !this.connectionStatus.value) {
      console.warn('WebSocket not connected. Message not sent:', type, data);
      return;
    }

    this.socket$.next({
      type,
      ...data
    });
  }

  getMessages(): Observable<any> {
    return this.messagesSubject.asObservable();
  }

  getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus.asObservable();
  }

  close(): void {
    if (this.socket$) {
      this.socket$.complete();
    }
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
  }

  private handleError(error: any): Observable<never> {
    console.error('WebSocket error:', error);
    return new Observable<never>(observer => {
      observer.error(error);
    });
  }

  private attemptReconnect(roomName: number) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Maximum reconnect attempts reached');
      this.messagesSubject.error('Maximum reconnect attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    
    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);
    
    this.reconnectTimer = setTimeout(() => {
      console.log(`Reconnecting... (attempt ${this.reconnectAttempts})`);
      this.connect(roomName);
    }, delay);
  }
}