import React, {useState} from "react";
import {MainHeader} from "../../components/MainHeader";
import MainFooter from "../../components/MainFooter";
import {Accordion, Card, Container, ListGroup, Table} from "react-bootstrap";
import {useRecoilState} from "recoil";
import {gameListState} from "../../states/states";

function GameListTable() {
    return <Table striped bordered hover variant="light">
        <thead>
        <tr>
            <th>날짜</th>
            <th>시간</th>
            <th>구장</th>
            <th>경기</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td rowSpan={2} style={{verticalAlign: 'middle'}}>2021-05-01</td>
            <td>17:00</td>
            <td>잠실</td>
            <td>SSG 5:2 두산</td>
        </tr>
        <tr>
            <td>17:00</td>
            <td>잠실</td>
            <td>SSG 5:2 두산</td>
        </tr>
        <tr>
            <td>2021-05-02</td>
            <td>17:00</td>
            <td>잠실</td>
            <td>SSG 5:2 두산</td>
        </tr>
        </tbody>
    </Table>;
}

export default function GameList() {

    const [gameList, setGameList] = useRecoilState(gameListState);
    const [init, setInit] = useState(true);

    if (init) {
        fetch("/api/game_list?recent=1").then(res => res.json()).then(json => setGameList(json))
        setInit(false)
    }


    return (
        <>
            <MainHeader/>
            <h2 className="text-center my-4">현재 시즌 경기</h2>
            <Container>
                <Accordion className="text-center">
                    <Card.Body>
                        <ListGroup variant="flush">
                            <GameListTable/>
                        </ListGroup>
                    </Card.Body>
                </Accordion>
            </Container>

            <MainFooter/>
        </>
    )
}