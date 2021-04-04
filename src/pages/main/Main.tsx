import React, {useState} from "react";
import {MainHeader} from "../../components/MainHeader";
import {Card, Col, Container, FormControl, InputGroup, Jumbotron, ListGroup, Row} from "react-bootstrap";
import MainFooter from "../../components/MainFooter";
import './main.scss';
import {GameData} from "../../interfaces/interfaces";
import {gameListState} from "../../states/states";
import {useRecoilState} from "recoil";
import {Link, Redirect} from "react-router-dom";

export default function Main() {

  const [searchValue, setSearchValue] = useState("")
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

  const RecentListArray = () => {
    return gameList.gameTitleArray.slice(0, 6).map((game, index) => {
      return <ListGroup.Item key={index}><a href={"/game/" + gameList.gameIdArray[index]}>{game}</a></ListGroup.Item>
    })
  }

  const goToGame = (gameId: string) => {
    return <Redirect to={"/game/" + gameId}/>
  }

  return (
      <div className="app">
        <MainHeader/>

        <div className="w-100 notification-bar text-center py-2">
          <h5>(공지) 현재 두산 VS 삼성 매치가 진행중입니다</h5>{' '}<a href="/game/test">[바로가기]</a>
        </div>

        <Jumbotron id="main-search-jumbotron" className="rounded-0 text-center" fluid>
          <h3 className="text-white font-weight-bold">KBO.GG</h3>
          <InputGroup>
            <FormControl
                placeholder="게임 검색"
                aria-label="게임 검색"
                aria-describedby="basic-addon2"
                value={searchValue}
                onChange={(event) => setSearchValue(event.currentTarget.value)}
            />
            <InputGroup.Append>
              <Link to={"/game/" + searchValue} className="btn btn-warning">검색</Link>
            </InputGroup.Append>
          </InputGroup>
        </Jumbotron>

        <Container>
          <Row>
            <Col md="6">
              <Card className="rounded-0">
                <Card.Header className="font-weight-bold text-center">최근 경기 내역</Card.Header>
                <ListGroup variant="flush">
                  {RecentListArray()}
                </ListGroup>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <Card.Header className="font-weight-bold text-center">테스트</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md="6">
              <Card className="rounded-0">
                <Card.Header className="font-weight-bold text-center">테스트</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <Card.Header className="font-weight-bold text-center">테스트</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

        </Container>

        <MainFooter />
      </div>
  );
}