import React, {useState} from "react";
import {MainHeader} from "../../components/MainHeader";
import MainFooter from "../../components/MainFooter";
import {Accordion, Button, Card, Container, Row, Spinner} from "react-bootstrap";
import {useRecoilState} from "recoil";
import {gameListState} from "../../states/states";
import GameListTable from "../../components/GameListTable";
import {getVisibility} from "../../lib/functions";

export default function History() {

  const [gameList, setGameList] = useRecoilState(gameListState);
  const [init, setInit] = useState(true);
  const [visible, setVisible] = useState(true)

  if (init) {
    fetch("/api/game_list").then(res => res.json()).then(json => setGameList(json)).then(() => setVisible(false))
    setInit(false)
  }

  return (
      <>
        <MainHeader/>
        <h2 className="text-center my-4">과거 경기 기록</h2>
        <Container>
          <Accordion defaultActiveKey="0" className="rounded-0">
            <Card className="rounded-0 text-center">
              <Card.Header className="rounded-0 bg-dark">
                <Accordion.Toggle as={Button} variant="link" eventKey="0" className="text-white">
                  2021년 기록
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Row className={getVisibility(!visible)}>
                    <GameListTable gameList={gameList}/>
                  </Row>
                  <Row className="justify-content-center">
                    <Spinner className={"m-4 " + getVisibility(visible)} animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="rounded-0 text-center">
              <Card.Header className="rounded-0 bg-dark">
                <Accordion.Toggle as={Button} variant="link" eventKey="1" className="text-white">
                  2020년 기록
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  2020년 이전 기록은 지원되지 않습니다
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Container>

        <MainFooter/>
      </>
  );
}