export interface GamePageParams {
    id ?: string
}

export interface CurrentPlayerInfo {
    teamName: string;
    playerName: string;
    tasuk: number;
    tasu: number;
    anta: number;
    tajum: number;
    pisamjin: number;
    homerun: number;
}

export interface SideBarProps {
    className?: string;
    currentPlayer: CurrentPlayerInfo;
}