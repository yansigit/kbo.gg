import {atom} from "recoil";
import {GameData} from "../interfaces/interfaces"

export const gameDataState = atom({
    key: 'gameDataState',
    default: {awayTeam: {graph_data: {}}, homeTeam: {graph_data: {}}} as unknown as GameData
})