import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerStatsDisplayComponent } from './player-stats-display.component';

describe('PlayerStatsDisplayComponent', () => {
  let component: PlayerStatsDisplayComponent;
  let fixture: ComponentFixture<PlayerStatsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerStatsDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerStatsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
