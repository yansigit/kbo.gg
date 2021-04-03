import React, {useEffect} from 'react';
import {Button, Card, Col, Container, Jumbotron, Row} from "react-bootstrap";
import {MainHeader} from "../../components/MainHeader";
import {MainSideBar} from "../../components/MainSideBar";
import {Line} from "react-chartjs-2";
import {RouteComponentProps} from "react-router-dom";
import {CurrentPlayerInfo, GamePageParams} from "../../interfaces/interfaces"
import MainFooter from "../../components/MainFooter";
import {useRecoilState} from "recoil";
import {gameDataState} from "../../states/states";
import postData, {randomString} from "../../lib/functions";

import './game.scss';

function Game(props: RouteComponentProps<GamePageParams>) {
  let {match} = props;

  const [gameData, setGameData] = useRecoilState(gameDataState)

  const gameId = match.params.id

  useEffect(() => {
    updateGameData();
  });

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
    teamName: gameData.awayTeam.team_name,
    playerName: gameData.awayTeam.current_player,
    position: gameData.awayTeam.current_player_position
  }

  let homeCurrentPlayerInfo: CurrentPlayerInfo = {
    teamName: gameData.homeTeam.team_name,
    playerName: gameData.homeTeam.current_player,
    position: gameData.homeTeam.current_player_position
  }

  const updateGameData = () => {
    postData("/api/read_game", {gameId: gameId}).then(
        res => {
          setGameData(res)
        })
  }

  const getGraphData = (graph_data: { x: string[]; y: number[] }) => {
    let rankColor = ["#11b288", "#207ac7", "#207ac7", "#207ac7", "#d6d6d6", "#d6d6d6", "#d6d6d6", "#d6d6d6"]
    let data = {
      labels: graph_data.x,
      datasets: [
        {
          backgroundColor: rankColor,
          borderColor: rankColor,
          borderWidth: 1,
          hoverBackgroundColor: rankColor,
          hoverBorderColor: rankColor,
          data: graph_data.y
        }
      ]
    }
    return data
  }

  const addDummies = () => {
    const target = JSON.parse(JSON.stringify(gameData));
    target.awayTeam.graph_data.x.push(randomString(6))
    target.awayTeam.graph_data.y.push(Math.floor(Math.random() * 100))
    target.homeTeam.graph_data.x.push(randomString(6))
    target.homeTeam.graph_data.y.push(Math.floor(Math.random() * 100))
    setGameData(target)
  }

  return (
      <div className="App">
        <MainHeader/>
        <span>{gameId}</span>
        <span>{JSON.stringify(gameData)}</span>
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
                    <Jumbotron
                        className="d-flex align-items-center justify-content-center rounded-0 m-0 game-big-panel"
                        fluid>
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

                <Button onClick={() => addDummies()}>그래프 업데이트</Button>

                <Row>
                  <Col md="6">
                    <Card className="rounded-0 mt-4 game-card">
                      <Card.Header className="bg-danger text-white">
                        {awayCurrentPlayerInfo.teamName} 승리확률
                      </Card.Header>
                      <Card.Body>
                        <Line data={getGraphData(gameData.awayTeam.graph_data)} options={graphOptions}/>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md="6">
                    <Card className="rounded-0 mt-4 game-card">
                      <Card.Header className="bg-primary text-white">
                        {homeCurrentPlayerInfo.teamName} 승리확률
                      </Card.Header>
                      <Card.Body>
                        <Line data={getGraphData(gameData.homeTeam.graph_data)} options={graphOptions}/>
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

        <MainFooter/>
      </div>
  );
}

export default Game;
