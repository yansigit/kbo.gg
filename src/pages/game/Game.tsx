import React from 'react';
import {Button, Card, Col, Container, Jumbotron, Row} from "react-bootstrap";
import {MainHeader} from "../../components/MainHeader";
import {MainSideBar} from "../../components/MainSideBar";
import DataStore from "../../store";
import {Line} from "react-chartjs-2";
import {RouteComponentProps} from "react-router-dom";
import {CurrentPlayerInfo, GamePageParams} from "../../interfaces/interfaces"
import MainFooter from "../../components/MainFooter";

// @ts-ignore
import './game.scss';


function Game({match}: RouteComponentProps<GamePageParams>) {

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
    position: '타자'
  }

  let homeCurrentPlayerInfo: CurrentPlayerInfo = {
    teamName: 'NC 다이노스',
    playerName: '김 티라노',
    position: '투수'
  }

  return (
    <div className="App">
      <MainHeader/>

      <main id="game-main">
        <Container fluid>
          <Row>
            <Col xl={{span: 2, order: 'first'}}>
              <MainSideBar type="away" currentPlayer={awayCurrentPlayerInfo} className="mt-4 game-card"/>
            </Col>

            <Col xl={{span: 8}} xs={{order: 'first'}}>
              <Card className="rounded-0 mt-4 game-card">
                <Card.Header>
                  실시간 경기
                </Card.Header>
                <Card.Body className="p-0">
                  <Jumbotron className="d-flex align-items-center justify-content-center rounded-0 m-0 game-big-panel" fluid>
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
              <Button type="button" onClick={() => DataStore.update("2021HCMZGII7073")}/>
              <Row>
                <Col md="6">
                  <Card className="rounded-0 mt-4 game-card">
                    <Card.Header className="bg-danger text-white">
                      {awayCurrentPlayerInfo.teamName} 승리확률
                    </Card.Header>
                    <Card.Body>
                      <Line data={DataStore.awayTeamChartData} options={graphOptions}/>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md="6">
                  <Card className="rounded-0 mt-4 game-card">
                    <Card.Header className="bg-primary text-white">
                      {homeCurrentPlayerInfo.teamName} 승리확률
                    </Card.Header>
                    <Card.Body>
                      <Line data={DataStore.homeTeamChartData} options={graphOptions}/>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>

            <Col xl={2}>
              <MainSideBar type="home" currentPlayer={homeCurrentPlayerInfo} className="mt-4 game-card"/>
            </Col>
          </Row>
        </Container>
      </main>

      <MainFooter />
    </div>
  );
}

export default Game;
