import React, {useEffect} from 'react';
import './App.css';
import {Card, Col, Container, Row} from "react-bootstrap";
import {MainHeader} from "./MainHeader";
import {MainSideBar} from "./MainSideBar";
import DataStore from "./store";
import {Line} from "react-chartjs-2";
import {RouteComponentProps} from "react-router-dom";
import {CurrentPlayerInfo, GamePageParams} from "./interfaces/interfaces"

function Game({ match } : RouteComponentProps<GamePageParams>) {
  useEffect(() => {})

  const gameId = match.params.id ? match.params.id : "ID 없음";

  const graphOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  let awayCurrentPlayerInfo: CurrentPlayerInfo = {
    teamName: '두산 베이스',
    playerName: '최주환',
    tasuk: 1,
    tasu: 1,
    anta: 1,
    tajum: 1,
    pisamjin: 1,
    homerun: 1
  }

  let homeCurrentPlayerInfo: CurrentPlayerInfo = {
    teamName: '삼성 라이온즈',
    playerName: '구자욱',
    tasuk: 1,
    tasu: 1,
    anta: 1,
    tajum: 1,
    pisamjin: 1,
    homerun: 1
  }

  return (
    <div className="App">
      <MainHeader />

      <div>GAME ID : {gameId}</div>

      <Container fluid>
        <Row>
          <Col xl={{span:2, order: 'first'}}>
            <MainSideBar currentPlayer={awayCurrentPlayerInfo} className="mt-4" />
          </Col>

          <Col xl={{span: 8}} xs={{order: 'first'}}>
            <Card className="rounded-0 mt-4">
              <Card.Header>
                실시간 경기
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <iframe className="w-100" height="450px" src="https://www.youtube.com/embed/PwNXY5zeoc0" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                  </Col>
                  <Col md="6">
                    <iframe className="w-100" height="450px" frameBorder="0" src="https://sports.news.naver.com/gameCenter/miniTextRelay.nhn?category=kbo&date=20201124&gameId=77771124OBNC02020" />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Row>
              <Col md="6">
                <Card className="rounded-0 mt-4">
                  <Card.Header className="bg-danger text-white">
                    AWAY팀 승리확률
                  </Card.Header>
                  <Card.Body>
                    <Line data={DataStore.data} options={graphOptions} />
                  </Card.Body>
                </Card>
              </Col>
              <Col md="6">
                <Card className="rounded-0 mt-4">
                  <Card.Header className="bg-primary text-white">
                    HOME팀 승리확률
                  </Card.Header>
                  <Card.Body>
                    <Line data={DataStore.data} options={graphOptions} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>

          <Col xl={2}>
            <MainSideBar currentPlayer={homeCurrentPlayerInfo} className="mt-4" />
          </Col>
        </Row>
      </Container>065
      <div className="footer bg-primary w-100 mt-4">
        <h4 className="text-white">KBO.GG</h4>
      </div>
    </div>
  );
}

export default Game;
