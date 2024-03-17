export class Player{
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    team_id: number;
    team: any; // TODO Put in team model
    number: number;
    height: string;
    weight: number;
    date_of_birth: Date;
    years_pro: number;
    college: string;
    photo_url: string;
    created_at: Date;
}

export interface PlayersPositionDictionary {
    [position: string]: Player[]; // Assuming each position has an array of players
}