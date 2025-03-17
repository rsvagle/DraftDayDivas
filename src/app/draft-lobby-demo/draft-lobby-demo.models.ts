export interface Player {
    rk: number;
    player: string;
    team: string;
    pos: string;
    bye: number;
    pts: number;
    stats: {
        rush?: number;
        ruyd?: number;
        rutd?: number;
        rec?: number;
        reyd?: number;
        retd?: number;
        com?: number;
        att?: number;
        payd?: number;
        patd?: number;
        int?: number;
    };
}
  
export interface DraftPick {
round: number;
pick: number;
teamName: string;
player: Player;
time: string;
}

export interface Team {
id: string;
name: string;
owner: string;
isAutoPick: boolean;
roster: Player[];
queuedPlayers: Player[];
}