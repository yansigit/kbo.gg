import React, {useEffect, useState} from "react";
import {MainHeader} from "../../components/MainHeader";
import MainFooter from "../../components/MainFooter";
import GameListTable from "../../components/GameListTable";
import {Accordion, Card, Container, ListGroup, Row, Spinner} from "react-bootstrap";
import {useRecoilState} from "recoil";
import {gameListState} from "../../states/states";
import {getVisibility} from "../../lib/functions";

export default function GameList() {

    const [gameList, setGameList] = useRecoilState(gameListState);
    const [month, setMonth] = useState(4);
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        setVisible(true)
        fetch("/api/game_list?month=" + month).then(res => res.json()).then(json => setGameList(json)).then(() => setVisible(false))
    }, [month])

    return (
        <>
            <MainHeader/>
            <Row className="justify-content-center">
                <h2 className='text-center m-4'>현재 시즌 경기</h2>
            </Row>
            <Row className="justify-content-center align-content-center w-100 m-0">
                <h2 className="text-center m-4" style={{cursor: "grab"}} onClick={() => {
                    if (month > 4)
                        setMonth(month - 1)
                }}>◀</h2>
                <h2 className="text-center m-4">{month}월</h2>
                <h2 className="text-center m-4" style={{cursor: "grab"}} onClick={() => {
                    if (month < 10)
                        setMonth(month + 1)
                }}>▶</h2>
            </Row>
            <Container className={getVisibility(!visible)}>
                <Accordion className="text-center">
                    <Card.Body>
                        <ListGroup variant="flush">
                            <GameListTable gameList={gameList}/>
                        </ListGroup>
                    </Card.Body>
                </Accordion>
            </Container>
            <Row className="justify-content-center">
                <Spinner className={"m-4 " + getVisibility(visible)} animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Row>

            <MainFooter/>
        </>
    )
}