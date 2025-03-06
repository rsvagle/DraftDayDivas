import { Component, inject } from '@angular/core';
import { DraftService } from './draft-lobby.service';
import { Subscription } from 'rxjs';
import { PrimeNgLightModule } from '../primeng.light.module';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { TabViewModule } from 'primeng/tabview';
import { AvatarModule } from 'primeng/avatar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-draft-lobby-demo',
  standalone: true,
  imports: [PrimeNgLightModule, CommonModule, CardModule, ToolbarModule, TabViewModule, AvatarModule, RippleModule, InputSwitchModule],
  providers: [DraftService],
  templateUrl: './draft-lobby-demo.component.html',
  styleUrl: './draft-lobby-demo.component.scss'
})
export class DraftLobbyDemoComponent {
  messages: { username: string; text: string }[] = [];
  newMessage: string = '';
  draftService = inject(DraftService);
  selectedActivity: string = 'all';

  private draftSubscription: Subscription;

  constructor() {


  }

  ngOnInit() {
    this.draftService.connect('draft_room');  // Replace with actual room name

    // Subscribe to the backend pushing messages
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
