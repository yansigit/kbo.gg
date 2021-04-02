import {observable} from 'mobx';
import {gameData} from "./interfaces/interfaces";
import postData from "./lib/functions";
import {ChartData} from "react-chartjs-2";
import Chart from "chart.js";

class DataStore {
    @observable gameData: gameData = {
        id: "606711537f5d40c15da81365",
        created_at: "2021-04-02T12:42:59.3006109Z",
        updated_at: "2021-04-02T12:42:59.3006109Z",
        gameId: "2021EHMGXWV8487",
        awayTeam: {
            score: 0,
            team_name: "HE OLLHV",
            current_player: "장적효",
            current_player_position: "투수",
            graph_data: {
                x: [
                    "연조임",
                    "성성준",
                    "염백효",
                    "장민만",
                    "취강강",
                    "조윤염",
                    "윤임취"
                ],
                y: [
                    53,
                    42,
                    49,
                    2,
                    95,
                    6,
                    53
                ]
            }
        },
        homeTeam: {
            score: 11,
            team_name: "MK IZOAZR",
            current_player: "임백임",
            current_player_position: "타자",
            graph_data: {
                x: [
                    "요성연",
                    "윤임임",
                    "만준만",
                    "강임효",
                    "장상요",
                    "요조조",
                    "백임염"
                ],
                y: [
                    88,
                    74,
                    80,
                    92,
                    21,
                    66,
                    46
                ]
            }
        }
    }
    @observable awayTeamChartData: ChartData<Chart.ChartData> = {
        labels: ['선수1', '2', '3', '4', '5', '6'],
        datasets: [
            {
                label: '승리 확률',
                data: [50, 65, 25, 30, 43, 80, 90, 95, 100],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    }
    @observable homeTeamChartData: ChartData<Chart.ChartData> = {
        labels: ['선수1', '2', '3', '4', '5', '6'],
        datasets: [
            {
                label: '승리 확률',
                data: [50, 65, 25, 30, 43, 80, 90, 95, 100],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    }

    update(gameId: string) {
        postData("/api/read_game", {gameId: gameId}).then(
            result => {
                this.gameData = result;
                this.awayTeamChartData = {
                    labels: this.gameData.awayTeam.graph_data.x,
                    datasets: [
                        {
                            label: '승리 확률',
                            data: this.gameData.awayTeam.graph_data.y,
                            fill: false,
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgba(255, 99, 132, 0.2)',
                        },
                    ],
                };
                this.homeTeamChartData = {
                    labels: this.gameData.homeTeam.graph_data.x,
                    datasets: [
                        {
                            label: '승리 확률',
                            data: this.gameData.homeTeam.graph_data.y,
                            fill: false,
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgba(255, 99, 132, 0.2)',
                        },
                    ],
                };
            },
            err => console.error(err))
    }
}

export default new DataStore();