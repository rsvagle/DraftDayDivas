import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class DraftService {
  private socket$: WebSocketSubject<any>;

  constructor() {}

  connect(roomName: string) {
    this.socket$ = new WebSocketSubject(`ws://127.0.0.1:8000/ws/draft/${roomName}/`);
  }

  sendMessage(type: string, data: any) {
    this.socket$.next({
      type,
      text: data.text,  // Ensure that 'text' is part of the message payload
      ...data
    });
  }
  getMessages() {
    return this.socket$;
  }

  close(): void {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}