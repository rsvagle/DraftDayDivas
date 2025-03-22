import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { DraftService } from './draft-lobby.service';
import { Subscription, interval } from 'rxjs';
import { PrimeNgLightModule } from '../primeng.light.module';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { TabViewModule } from 'primeng/tabview';
import { AvatarModule } from 'primeng/avatar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Player, Team, DraftPick } from './draft-lobby-demo.models';
import { AuthService } from '../auth/auth.service';
import { LoggedInUser } from '../auth/auth.models';

@Component({
  selector: 'app-draft-lobby-demo',
  standalone: true,
  imports: [
    PrimeNgLightModule, 
    CommonModule, 
    CardModule, 
    ToolbarModule, 
    TabViewModule, 
    AvatarModule, 
    RippleModule, 
    InputSwitchModule,
  ],
  providers: [DraftService, MessageService],
  templateUrl: './draft-lobby-demo.component.html',
  styleUrl: './draft-lobby-demo.component.scss'
})
export class DraftLobbyDemoComponent implements OnInit, OnDestroy {
  // Chat and activity
  messages: { username: string; text: string; type: string }[] = [];
  newMessage: string = '';
  selectedActivity: string = 'all';
  username: string | null = null;
  
  // Draft state
  currentRound: number = 1;
  currentPick: number = 1;
  selectedPlayer: Player | null = null;
  availablePlayers: Player[] = [];
  pickHistory: DraftPick[] = [];
  teams: Team[] = [];
  userTeam: Team | null = null;
  
  // Timer
  timerSeconds: number = 90;
  timerInterval: any;
  isUserTurn: boolean = false;
  showDraftNotification: boolean = false;
  
  // Filters
  positionFilters: any[] = [
    { label: 'All Positions', value: 'ALL' },
    { label: 'QB', value: 'QB' },
    { label: 'RB', value: 'RB' },
    { label: 'WR', value: 'WR' },
    { label: 'TE', value: 'TE' },
    { label: 'K', value: 'K' },
    { label: 'D/ST', value: 'DST' }
  ];
  teamFilters: any[] = [
    { label: 'All NFL Teams', value: 'ALL' },
    { label: 'ARI', value: 'ARI' },
    { label: 'ATL', value: 'ATL' },
    // Add all other teams
  ];
  sortOptions: any[] = [
    { label: 'Projected Points', value: 'PROJ' },
    { label: 'Average Draft Position', value: 'ADP' },
    { label: 'Rank', value: 'RANK' }
  ];
  selectedPosition: string = 'ALL';
  selectedTeam: string = 'ALL';
  selectedSort: string = 'PROJ';
  searchTerm: string = '';
  
  // Service injections
  draftService = inject(DraftService);
  messageService = inject(MessageService);
  authService = inject(AuthService);
  
  // Subscriptions
  private draftSubscription: Subscription;
  private timerSubscription: Subscription;
  private unsubscribe$ = new Subject<void>();
  
  // Draft state properties
  draftStarted: boolean = false;
  isPaused: boolean = false;
  isAutoPick: boolean = false;
  reconnecting: boolean = false;
  
  // Current draft status
  currentDrafter: string = '';
  nextDrafter: string = '';
  
  // UI state
  activeTabIndex: number = 0;
  showPlayerModal: boolean = false;
  draftOrder: number[] = [];

  constructor() {
    // Initialize empty available players
    this.availablePlayers = [];
    
    // Initialize mock teams
    this.initializeTeams();
  }

  ngOnInit() {
    const currentUser: LoggedInUser | null = this.authService.currentUserValue;
    console.log(currentUser);
    if (currentUser) {
      this.username = currentUser.user.username;
    }
    
    // Connect to draft room WebSocket
    this.draftService.connect('draft_room');
    
    // Subscribe to WebSocket messages
    this.draftSubscription = this.draftService.getMessages()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (message) => {
          console.log("Received a websocket message!", message);
          this.handleWebSocketMessage(message);
        },
        (error) => {
          console.error('WebSocket error:', error);
          this.handleReconnection();
        }
      );
    
    // Load initial data
    this.loadAvailablePlayers();
    this.startDraftTimer();
    this.checkUserTurn();
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    
    if (this.draftSubscription) {
      this.draftSubscription.unsubscribe();
    }
    
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    
    this.draftService.close();
  }

  // WebSocket message handler
  private handleWebSocketMessage(message: any) {
    switch (message.type) {
      case 'chat_message':
        this.addMessage(message);
        break;
      case 'draft_pick':
        this.handleDraftPick(message);
        break;
      case 'draft_start':
        this.handleDraftStart(message);
        break;
      case 'draft_pause':
        this.handleDraftPause(message);
        break;
      case 'user_turn':
        this.handleUserTurn(message);
        break;
      case 'draft_order':
        this.handleDraftOrder(message);
        break;
      case 'draft_complete':
        this.handleDraftComplete(message);
        break;
      case 'team_update':
        this.handleTeamUpdate(message);
        break;
      case 'available_players':
        this.handleAvailablePlayers(message);
        break;
      case 'timer_update':
        this.handleTimerUpdate(message);
        break;
      case 'system_message':
        this.addSystemMessage(message);
        break;
      default:
        console.warn('Unknown message type:', message.type);
    }
  }

  // Message handling
  private addMessage(message: any) {
    this.messages.push({
      username: message.username,
      text: message.text,
      type: 'chat_message'
    });
  }

  private addSystemMessage(message: any) {
    this.messages.push({
      username: 'System',
      text: message.text,
      type: 'system'
    });
    
    // Also show as a toast notification
    this.messageService.add({
      severity: message.severity || 'info',
      summary: message.summary || 'System Message',
      detail: message.text
    });
  }

  // Draft pick handling
  private handleDraftPick(message: any) {
    // Update pick history
    this.pickHistory.push({
      round: message.round,
      pick: message.pick,
      teamName: message.teamName,
      player: message.player,
      time: new Date().toLocaleTimeString()
    });
    
    // Remove player from available players
    this.removePlayerFromAvailable(message.player.rk);
    
    // Update team rosters
    this.updateTeamRoster(message.teamName, message.player);
    
    // Add to activity feed
    this.addPickActivity(message);
    
    // Update current round and pick
    this.currentRound = message.nextRound;
    this.currentPick = message.nextPick;
    
    // Check if it's user's turn
    this.checkUserTurn();
    
    // Reset timer
    this.resetTimer();
  }

  private handleDraftStart(message: any) {
    this.draftStarted = true;
    this.addSystemMessage({
      text: 'The draft has started!',
      severity: 'info',
      summary: 'Draft Started'
    });
    
    // Set draft order
    this.draftOrder = message.draftOrder;
    
    // Start timer
    this.startDraftTimer();
  }

  private handleDraftPause(message: any) {
    this.isPaused = message.isPaused;
    const statusText = this.isPaused ? 'paused' : 'resumed';
    
    this.addSystemMessage({
      text: `The draft has been ${statusText}`,
      severity: 'info',
      summary: `Draft ${statusText}`
    });
    
    // Handle timer
    if (this.isPaused) {
      this.pauseTimer();
    } else {
      this.resumeTimer();
    }
  }

  private handleUserTurn(message: any) {
    this.isUserTurn = true;
    this.currentDrafter = message.teamName;
    this.nextDrafter = message.nextTeam;
    
    // Show notification
    this.showDraftNotification = true;
    
    // Add notification
    this.addSystemMessage({
      text: `It's your turn to pick!`,
      severity: 'warn',
      summary: 'Your Turn'
    });
    
    // Play sound
    this.playNotificationSound();
  }

  private handleDraftOrder(message: any) {
    this.draftOrder = message.draftOrder;
  }

  private handleDraftComplete(message: any) {
    this.addSystemMessage({
      text: 'The draft is complete!',
      severity: 'success',
      summary: 'Draft Complete'
    });
    
    // Stop timer
    this.stopTimer();
    
    // Show final results
    this.showFinalResults();
  }

  private handleTeamUpdate(message: any) {
    const teamIndex = this.teams.findIndex(t => t.id === message.teamId);
    if (teamIndex !== -1) {
      this.teams[teamIndex] = {
        ...this.teams[teamIndex],
        ...message.teamData
      };
      
      // If this is the user's team, update userTeam
      if (this.userTeam && this.userTeam.id === message.teamId) {
        this.userTeam = this.teams[teamIndex];
      }
    }
  }

  private handleAvailablePlayers(message: any) {
    this.availablePlayers = message.players;
  }

  private handleTimerUpdate(message: any) {
    this.timerSeconds = message.timeRemaining;
  }

  // User actions
  sendMessage(text: string) {
    if (!text.trim()) return;
    console.log("Sending message");
    this.draftService.sendMessage('chat_message', { 
      username: this.username || 'Anonymous', 
      text: text.trim() 
    });
    
    this.newMessage = '';
  }

  tryDraftPlayer(){
    this.draftPlayer(this.availablePlayers[0]);
  }

  draftPlayer(player: Player) {
    // if (!this.isUserTurn) {
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: 'Not Your Turn',
    //     detail: 'Please wait for your turn to draft a player.'
    //   });
    //   return;
    // }
    
    this.draftService.sendMessage('draft_pick', { 
      player,
      username: this.username,
      team_id: 5,
      round: this.currentRound,
      pick: this.currentPick
    });
    
    // Immediately update local state
    this.selectedPlayer = null;
    this.isUserTurn = false;
    this.showDraftNotification = false;
  }

  toggleAutoPick() {
    this.isAutoPick = !this.isAutoPick;
    
    if (this.userTeam) {
      this.draftService.sendMessage('toggle_autopick', {
        teamId: this.userTeam.id,
        isAutoPick: this.isAutoPick
      });
    }
  }

  addToQueue(player: Player) {
    if (this.userTeam) {
      this.userTeam.queuedPlayers.push(player);
      this.draftService.sendMessage('queue_update', {
        teamId: this.userTeam.id,
        queuedPlayers: this.userTeam.queuedPlayers
      });
    }
  }

  removeFromQueue(index: number) {
    if (this.userTeam && this.userTeam.queuedPlayers.length > index) {
      this.userTeam.queuedPlayers.splice(index, 1);
      this.draftService.sendMessage('queue_update', {
        teamId: this.userTeam.id,
        queuedPlayers: this.userTeam.queuedPlayers
      });
    }
  }

  selectPlayer(player: Player) {
    this.selectedPlayer = player;
    this.showPlayerModal = true;
  }

  // Filter methods
  filterPlayers() {
    this.draftService.sendMessage('filter_players', {
      position: this.selectedPosition,
      team: this.selectedTeam,
      sort: this.selectedSort,
      search: this.searchTerm
    });
  }

  onPositionChange() {
    this.filterPlayers();
  }

  onTeamChange() {
    this.filterPlayers();
  }

  onSortChange() {
    this.filterPlayers();
  }

  onSearchChange() {
    this.filterPlayers();
  }

  // Timer methods
  private startDraftTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    
    this.timerSubscription = interval(1000)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (!this.isPaused && this.timerSeconds > 0) {
          this.timerSeconds--;
          
          // Auto-pick if timer expires and auto-pick is enabled
          if (this.timerSeconds === 0 && this.isUserTurn) {
            if (this.isAutoPick && this.userTeam) {
              this.executeAutoPick();
            } else {
              // Notify backend that timer expired
              this.draftService.sendMessage('timer_expired', {
                teamId: this.userTeam?.id,
                round: this.currentRound,
                pick: this.currentPick
              });
            }
          }
        }
      });
  }

  private playNotificationSound() {
    // Play notification sound when it's user's turn
    try {
      const audio = new Audio('assets/sounds/notification.mp3');
      audio.play();
    } catch (error) {
      console.warn('Failed to play notification sound:', error);
    }
  }

  private stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSeconds = 0;
  }

  private showFinalResults() {
    // Change to history tab
    this.activeTabIndex = 1;
    
    // Display final results message
    this.addSystemMessage({
      text: 'Draft complete! View the results in the Pick History tab.',
      severity: 'success',
      summary: 'Draft Complete'
    });
    
    // Potentially navigate to results page
    setTimeout(() => {
      // this.router.navigate(['/draft-results']);
      console.log('Navigate to draft results page');
    }, 5000);
  }

  private removePlayerFromAvailable(playerId: number) {
    const playerIndex = this.availablePlayers.findIndex(p => p.rk === playerId);
    if (playerIndex !== -1) {
      this.availablePlayers.splice(playerIndex, 1);
    }
  }

  private updateTeamRoster(teamName: string, player: Player) {
    const team = this.teams.find(t => t.name === teamName);
    if (team) {
      team.roster.push(player);
      
      // Remove from queue if present
      const queueIndex = team.queuedPlayers.findIndex(p => p.rk === player.rk);
      if (queueIndex !== -1) {
        team.queuedPlayers.splice(queueIndex, 1);
      }
    }
  }

  private addPickActivity(message: any) {
    this.messages.push({
      username: 'System',
      text: `${message.teamName} drafted ${message.player.player} (${message.player.pos} - ${message.player.team})`,
      type: 'pick'
    });
  }

  private checkUserTurn() {
    if (!this.userTeam) return;
    
    // Calculate the current drafter based on the draft order
    const teamCount = this.teams.length;
    let currentDrafterIndex: number;
    
    // Calculate the index in the draft order (handle snake draft)
    if (this.currentRound % 2 === 1) {
      // Odd rounds go forward
      currentDrafterIndex = (this.currentPick - 1) % teamCount;
    } else {
      // Even rounds go backward (snake draft)
      currentDrafterIndex = (teamCount - (this.currentPick % teamCount)) % teamCount;
    }
    
    const currentDrafterId = this.draftOrder[currentDrafterIndex];
    const currentDrafterTeam = this.teams.find(t => t.id === currentDrafterId.toString());
    
    if (currentDrafterTeam && this.userTeam.id === currentDrafterTeam.id) {
      this.isUserTurn = true;
      this.showDraftNotification = true;
      this.playNotificationSound();
    } else {
      this.isUserTurn = false;
      this.showDraftNotification = false;
    }
    
    // Update current drafter name for display
    this.currentDrafter = currentDrafterTeam?.name || '';
    
    // Calculate next drafter
    let nextDrafterIndex;
    if (this.currentRound % 2 === 1) {
      nextDrafterIndex = (currentDrafterIndex + 1) % teamCount;
    } else {
      nextDrafterIndex = (currentDrafterIndex - 1 + teamCount) % teamCount;
    }
    
    const nextDrafterId = this.draftOrder[nextDrafterIndex];
    const nextDrafterTeam = this.teams.find(t => t.id === nextDrafterId.toString());
    this.nextDrafter = nextDrafterTeam?.name || '';
  }

  private resetTimer() {
    this.timerSeconds = 90; // Reset to default timer duration
  }

  // Auto-pick functionality
  private executeAutoPick() {
    if (!this.userTeam || !this.isUserTurn) return;
    
    let selectedPlayer: Player | null = null;
    
    // First try to pick from queue
    if (this.userTeam.queuedPlayers.length > 0) {
      selectedPlayer = this.userTeam.queuedPlayers[0];
    } else {
      // Otherwise pick best available player based on position needs
      selectedPlayer = this.selectBestAvailablePlayer();
    }
    
    if (selectedPlayer) {
      this.draftService.sendMessage('draft_pick', {
        player: selectedPlayer,
        teamId: this.userTeam.id,
        round: this.currentRound,
        pick: this.currentPick,
        isAutoPick: true
      });
    }
  }

  private selectBestAvailablePlayer(): Player | null {
    if (!this.userTeam || this.availablePlayers.length === 0) return null;
    
    // Determine team needs based on roster
    const rosterCounts: { [key: string]: number } = {
      'QB': 0,
      'RB': 0,
      'WR': 0,
      'TE': 0,
      'K': 0,
      'DST': 0
    };
    
    // Count players by position
    this.userTeam.roster.forEach(player => {
      if (rosterCounts[player.pos] !== undefined) {
        rosterCounts[player.pos]++;
      }
    });
    
    // Determine position needs
    const positionPriority = this.determinePositionPriority(rosterCounts);
    
    // Get the best available player from the highest priority position
    for (const pos of positionPriority) {
      const bestPlayer = this.availablePlayers
        .filter(p => p.pos === pos)
        .sort((a, b) => b.pts - a.pts)[0];
      
      if (bestPlayer) {
        return bestPlayer;
      }
    }
    
    // If no player found based on position needs, return the overall best available
    return this.availablePlayers.sort((a, b) => b.pts - a.pts)[0];
  }

  private determinePositionPriority(rosterCounts: { [key: string]: number }): string[] {
    // Define position limits
    const positionLimits: { [key: string]: number } = {
      'QB': 1,
      'RB': 2,
      'WR': 2,
      'TE': 1,
      'K': 1,
      'DST': 1
    };
    
    // Calculate priority based on roster needs
    const priorities: [string, number][] = Object.entries(positionLimits)
      .map(([pos, limit]): [string, number] => [pos, limit - (rosterCounts[pos] || 0)])
      .filter(([, priority]) => priority > 0)
      .sort(([, priorityA], [, priorityB]) => priorityB - priorityA);
      
    // Return positions in priority order
    return priorities.map(([pos, _]) => pos);
  }

  // Reconnection handling
  private handleReconnection() {
    this.reconnecting = true;
    this.addSystemMessage({
      text: 'Connection lost. Attempting to reconnect...',
      severity: 'warn',
      summary: 'Connection Lost'
    });
    
    // Attempt to reconnect after 3 seconds
    setTimeout(() => {
      try {
        this.draftService.connect('draft_room');
        
        // Request current state
        this.draftService.sendMessage('request_state', {
          teamId: this.userTeam?.id
        });
        
        this.reconnecting = false;
        this.addSystemMessage({
          text: 'Reconnected successfully.',
          severity: 'success',
          summary: 'Reconnected'
        });
      } catch (error) {
        console.error('Failed to reconnect:', error);
        this.addSystemMessage({
          text: 'Failed to reconnect. Please refresh the page.',
          severity: 'error',
          summary: 'Connection Failed'
        });
      }
    }, 3000);
  }

  // Initialize mock teams for testing
  private initializeTeams() {
    this.teams = Array(12).fill(0).map((_, i) => ({
      id: `team${i + 1}`,
      name: `Team ${String.fromCharCode(65 + i)}`,
      owner: `Owner ${i + 1}`,
      isAutoPick: false,
      roster: [],
      queuedPlayers: []
    }));
    
    // Set user's team
    this.userTeam = this.teams[0];
  }

  // Load available players
  private loadAvailablePlayers() {
    // In a real implementation, this would come from the backend
    // For now, using mock data
    this.availablePlayers = [
      { rk: 1, player: 'Le\'Veon Bell', team: 'Pit', pos: 'RB', bye: 7, pts: 352.2, stats: { rush: 306, ruyd: 1319, rutd: 10, rec: 79 }},
      { rk: 2, player: 'Todd Gurley II', team: 'LAR', pos: 'RB', bye: 12, pts: 329.8, stats: { rush: 283, ruyd: 1274, rutd: 10, rec: 67 }},
      { rk: 3, player: 'David Johnson', team: 'Ari', pos: 'RB', bye: 9, pts: 326.1, stats: { rush: 266, ruyd: 1087, rutd: 8, rec: 76 }},
      { rk: 4, player: 'Antonio Brown', team: 'Pit', pos: 'WR', bye: 7, pts: 321.2, stats: { rec: 110, reyd: 1533, retd: 10 }},
      { rk: 5, player: 'Ezekiel Elliott', team: 'Dal', pos: 'RB', bye: 8, pts: 294.3, stats: { rush: 323, ruyd: 1403, rutd: 11, rec: 43 }}
    ];
    
    // In a real implementation, request all players from backend
    this.draftService.sendMessage('request_players', {});
  }

  // Method to pause the timer
  private pauseTimer() {
    this.isPaused = true;
  }

  // Method to resume the timer
  private resumeTimer() {
    this.isPaused = false;
  }
}