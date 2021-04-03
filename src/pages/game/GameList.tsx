import React from "react";
import {MainHeader} from "../../components/MainHeader";
import MainFooter from "../../components/MainFooter";
import {Accordion, Card, Container, ListGroup} from "react-bootstrap";
import {GameData} from "../../interfaces/interfaces";
import {useRecoilState} from "recoil";
import {gameListState} from "../../states/states";

export default function GameList() {

    const [gameList, setGameList] = useRecoilState(gameListState);

    fetch("/api/game_list").then(res => res.json()).then((gameList: GameData[]) => {
        setGameList({
            gameTitleArray: gameList.map(game => {
                return game.created_at + " / " + game.awayTeam.team_name + " VS " + game.homeTeam.team_name
            }), gameIdArray: gameList.map(game => {
                return game.gameId
            })
        })
    });


    const ListArray = () => {
        return gameList.gameTitleArray.map((game, index) => <ListGroup.Item key={index}><a
            href={"/game/" + gameList.gameIdArray[index]}>{game}</a></ListGroup.Item>)
    }

    return (
        <>
            <MainHeader/>
            <h2 className="text-center my-4">현재 시즌 내역</h2>
            <Container>
                <Accordion className="text-center">
                    <Card.Body>
                        <ListGroup variant="flush">
                            {ListArray()}
                        </ListGroup>
                    </Card.Body>
                </Accordion>
            </Container>

            <MainFooter/>
        </>
    )
}