import {GameData} from "../interfaces/interfaces";
import {Table} from "react-bootstrap";
import React from "react";

export default function GameListTable(props: { gameList: GameData[] }) {

    function TableBody(): JSX.Element {
        return <>
            {props.gameList.map((game, index) => {
                if (game.gameDate) {
                    let [date, time] = game.gameDate.split('T')
                    time = time.substr(0, 5)
                    return <tr>
                        <td>{date}</td>
                        <td>{time}</td>
                        <td>{game.gameStadium}</td>
                        <td><a href={'/game/' + game.gameId}>{game.awayTeam.team_name} VS {game.homeTeam.team_name}</a>
                        </td>
                    </tr>
                }
            })}
        </>
    }

    return <Table striped bordered hover variant="light">
        <thead>
        <tr>
            <th>날짜</th>
            <th>시간</th>
            <th>구장</th>
            <th>경기</th>
        </tr>
        </thead>
        <tbody className="text-center">
        <TableBody/>
        </tbody>
    </Table>
}