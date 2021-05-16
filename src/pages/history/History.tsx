import React, {useState} from "react";
import {MainHeader} from "../../components/MainHeader";
import MainFooter from "../../components/MainFooter";
import {Accordion, Button, Card, Container, ListGroup} from "react-bootstrap";
import {useRecoilState} from "recoil";
import {gameListState} from "../../states/states";

export default function History() {

  const [gameList, setGameList] = useRecoilState(gameListState);
  const [init, setInit] = useState(true);

  if (init) {
    fetch("/api/game_list?recent=1").then(res => res.json()).then(json => setGameList(json))
    setInit(false)
  }

  const ListArray = () => {
    return gameList.map((game, index) => <ListGroup.Item key={index}><a
        href={"/game/" + game.id}>{game.id}</a></ListGroup.Item>)
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
                  <ListGroup variant="flush">
                    {ListArray()}
                  </ListGroup>
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