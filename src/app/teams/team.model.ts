export class FootballTeam {
    id: number;
    team_name: string;
    location: string;
    abbreviation: string;
    team_color_primary: string;
    team_color_secondary: string;
    coach: string;
    conference: string;
    division: string;
    twitter_url: string;
    instagram_url: string;
    facebook_url: string;
    last_season_wins: number;
    last_season_lossess: number;
    last_season_ties: number;
    this_season_wins: number;
    this_season_lossess: number;
    this_season_ties: number;
    stadium: string;
    founded_year: number | null;
    championships_won: number;
    logo_url: string;
    official_website_url: string;
    created_at: Date;
}
