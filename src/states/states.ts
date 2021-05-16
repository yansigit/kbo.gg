import {atom} from "recoil";
import {GameData} from "../interfaces/interfaces"

export const gameDataState = atom({
    key: 'gameDataState',
    default: {awayTeam: {graph_data: {}}, homeTeam: {graph_data: {}}} as unknown as GameData
})

export const gameListState = atom({
    key: 'gameListState',
    default: [{
        id: "",
        created_at: "",
        updated_at: "",
        gameId: "",
        gameDate: "",
        gameStadium: "",
        awayTeam: {
            score: 0,
            team_name: "",
            current_player: "",
            current_player_position: ""
        },
        homeTeam: {
            score: 0,
            team_name: "",
            current_player: "",
            current_player_position: ""
        },
        graph_data: {
            x: [],
            y1: [],
            y2: []
        }
    }]
})