export interface GamePageParams {
    id ?: string
}

export interface CurrentPlayerInfo {
    teamName: string;
    playerName: string;
    position: string;
}

export interface SideBarProps {
    className?: string;
    currentPlayer: CurrentPlayerInfo;
    type: string;
    bat_lineup?: string[];
}

export interface GameData {
    id?: any,
    inning?: number,
    created_at?: any,
    updated_at?: any,
    gameDate: any,
    gameStadium: string,
    gameId: string,
    awayTeam: {
        score: number,
        team_name: string,
        current_player: string,
        current_player_position: string,
        bat_lineup: string[],
    },
    homeTeam: {
        score: number,
        team_name: string,
        current_player: string,
        current_player_position: string,
        bat_lineup: string[],
    },
    graph_data: {
        x: string[],
        y1: number[],
        y2: number[],
    }
}