import { Component, inject } from '@angular/core';
import { DraftService } from './draft-lobby.service';
import { Subscription } from 'rxjs';
import { PrimeNgLightModule } from '../primeng.light.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-draft-lobby-demo',
  standalone: true,
  imports: [PrimeNgLightModule, CommonModule],
  providers: [DraftService],
  templateUrl: './draft-lobby-demo.component.html',
  styleUrl: './draft-lobby-demo.component.scss'
})
export class DraftLobbyDemoComponent {
  messages: { username: string; text: string }[] = [];
  newMessage: string = '';
  draftService = inject(DraftService);
  private draftSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.draftService.connect('draft_room');  // Replace with actual room name
    this.draftSubscription = this.draftService.getMessages().subscribe((message) => {
      this.messages.push(message);
    });
  }

  draftPlayer(player: string) {
    this.draftService.sendMessage('draft_pick', { player, username: 'User123' });
  }

  sendMessage(text: string) {
    this.draftService.sendMessage('message', { username: 'user1', text: this.newMessage });
  }

  ngOnDestroy() {
    this.draftSubscription.unsubscribe();
    this.draftService.close();
  }
}
