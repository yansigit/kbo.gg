import React, {useEffect} from 'react';
import './App.css';
import {Card, Col, Container, Jumbotron, Row, Table, Button} from "react-bootstrap";
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
    position: '타자',
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
    position: '투수',
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
                <Card.Body className="p-0">
                  <Jumbotron id="game-big-panel" className="d-flex align-items-center justify-content-center rounded-0 m-0" fluid>
                    <table className="d-inline-block">
                      <tr>
                        <th className="panel-team-name">{awayCurrentPlayerInfo.teamName}</th>
                        <th className="panel-score" rowSpan={2}>2</th>
                      </tr>
                      <tr>
                        <th className="panel-player-name">{awayCurrentPlayerInfo.position} {awayCurrentPlayerInfo.playerName}</th>
                      </tr>
                    </table>

                    <Button variant="dark" className="d-inline-block mx-2" disabled>VS</Button>

                    <table className="d-inline-block">
                      <tr>
                        <th className="panel-score" rowSpan={2}>3</th>
                        <th className="panel-team-name">{homeCurrentPlayerInfo.teamName}</th>
                      </tr>
                      <tr>
                        <th className="panel-player-name">{homeCurrentPlayerInfo.position} {homeCurrentPlayerInfo.playerName}</th>
                      </tr>
                    </table>
                  </Jumbotron>
                </Card.Body>
                <Card.Body>
                  <Row>
                    <iframe className="w-100" height="450px" src="https://www.youtube.com/embed/PwNXY5zeoc0"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
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
