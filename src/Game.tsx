import React, {useEffect} from 'react';
import './App.css';
import {Card, Col, Container, Row} from "react-bootstrap";
import {MainHeader} from "./MainHeader";
import {MainSideBar} from "./MainSideBar";
import DataStore from "./store";
import {Line} from "react-chartjs-2";
import {RouteComponentProps} from "react-router-dom";
import {CurrentPlayerInfo, GamePageParams} from "./interfaces/interfaces"

function Game({match}: RouteComponentProps<GamePageParams>) {
  useEffect(() => {
  })

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
    teamName: '두산 베어스',
    playerName: '박 폴라베어',
    tasuk: 1,
    tasu: 1,
    anta: 1,
    tajum: 1,
    pisamjin: 1,
    homerun: 1
  }

  let homeCurrentPlayerInfo: CurrentPlayerInfo = {
    teamName: 'NC 다이노스',
    playerName: '김 티라노',
    tasuk: 1,
    tasu: 1,
    anta: 1,
    tajum: 1,
    pisamjin: 1,
    homerun: 1
  }

  return (
    <div className="App">
      <MainHeader/>

      <main id="game-main">
        <Container fluid>
          <Row>
            <Col xl={{span: 2, order: 'first'}}>
              <MainSideBar type="away" currentPlayer={awayCurrentPlayerInfo} className="mt-4"/>
            </Col>

            <Col xl={{span: 8}} xs={{order: 'first'}}>
              <Card className="rounded-0 mt-4">
                <Card.Header>
                  실시간 경기
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md="6">
                      <iframe className="w-100" height="450px" src="https://www.youtube.com/embed/PwNXY5zeoc0"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen/>
                    </Col>
                    <Col md="6">
                      <iframe className="w-100" height="450px" frameBorder="0"
                              src="https://sports.news.naver.com/gameCenter/miniTextRelay.nhn?category=kbo&date=20201124&gameId=77771124OBNC02020"/>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Row>
                <Col md="6">
                  <Card className="rounded-0 mt-4">
                    <Card.Header className="bg-danger text-white">
                      {awayCurrentPlayerInfo.teamName} 승리확률
                    </Card.Header>
                    <Card.Body>
                      <Line data={DataStore.data} options={graphOptions}/>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md="6">
                  <Card className="rounded-0 mt-4">
                    <Card.Header className="bg-primary text-white">
                      {homeCurrentPlayerInfo.teamName} 승리확률
                    </Card.Header>
                    <Card.Body>
                      <Line data={DataStore.data} options={graphOptions}/>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>

            <Col xl={2}>
              <MainSideBar type="home" currentPlayer={homeCurrentPlayerInfo} className="mt-4"/>
            </Col>
          </Row>
        </Container>
      </main>

      <footer className="footer bg-dark w-100 mt-4">
        <Container fluid>
          <h4 className="text-white">KBO.GG</h4>
        </Container>
      </footer>
    </div>
  );
}

export default Game;
