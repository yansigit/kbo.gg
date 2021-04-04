import React, {useState} from 'react';
import {Button, Card, Col, Container, Jumbotron, Row} from "react-bootstrap";
import {MainHeader} from "../../components/MainHeader";
import {MainSideBar} from "../../components/MainSideBar";
import {Line} from "react-chartjs-2";
import {RouteComponentProps} from "react-router-dom";
import {CurrentPlayerInfo, GameData, GamePageParams} from "../../interfaces/interfaces"
import MainFooter from "../../components/MainFooter";
import {useInterval} from "../../lib/functions";

import './game.scss';

class MockUpData implements GameData {
  awayTeam = {
    score: 0,
    team_name: "두산 베어스",
    current_player: "어웨이선수1",
    current_player_position: "투수",
    graph_data: {x: ["선수1"], y: [0]}
  };
  created_at = "2021";
  gameId = "TEST_ID";
  homeTeam = {
    score: 0,
    team_name: "삼성 라이온즈",
    current_player: "홈선수1",
    current_player_position: "타자",
    graph_data: {x: ["선수1"], y: [0]}
  };
  id = "TEST_ID";
  updated_at = "2021";
}

function Game(props: RouteComponentProps<GamePageParams>) {
  let {match} = props;

  const [isFetched, setFetched] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("로딩중입니다");
  const [gameData, setGameData] = useState(new MockUpData());
  const gameId = match.params.id;

  const updateGameData = () => {
    const target = Object.assign({}, gameData)
    target.awayTeam.score = gameData.awayTeam.score + Math.floor(Math.random() * 2);
    target.homeTeam.score = gameData.homeTeam.score + Math.floor(Math.random() * 2);

    const awayPlayerIndex = Math.floor(Math.random() * 50)
    const homePlayerIndex = Math.floor(Math.random() * 50)

    target.awayTeam.current_player = "선수" + awayPlayerIndex
    target.homeTeam.current_player = "선수" + homePlayerIndex
    const index = Math.floor(Math.random() * 2)
    const positions = ["투수", "타자"]
    target.homeTeam.current_player_position = positions[index]
    target.awayTeam.current_player_position = positions[index ^ 1]

    target.awayTeam.graph_data.x.push("선수" + awayPlayerIndex);
    target.awayTeam.graph_data.y.push(Math.floor(Math.random() * 100));
    target.homeTeam.graph_data.x.push("선수" + homePlayerIndex);
    target.homeTeam.graph_data.y.push(Math.floor(Math.random() * 100));

    setGameData(target)
  }

  useInterval(() => {
    updateGameData()
  }, 3 * 1000);

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

  const getGraphData = (graph_data: { x: string[]; y: number[] }) => {
    let rankColor = ["#11b288", "#207ac7", "#207ac7", "#207ac7", "#d6d6d6", "#d6d6d6", "#d6d6d6", "#d6d6d6"]
    let data = {
      labels: [...graph_data.x],
      datasets: [
        {
          label: "승률",
          fill: false,
          borderColor: 'rgb(255,219,0)',
          tension: 0.1,
          data: [...graph_data.y]
        }
      ]
    }
    return data
  }

  const GameRenderer = (fetched: boolean) => {
    if (!fetched)
      return <Container className="pt-3"><h2>{loadingMessage}</h2></Container>
    else
      return <main id="game-main">
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
                        <th className="panel-score" rowSpan={2}>{gameData.awayTeam.score}</th>
                      </tr>
                      <tr>
                        <th className="panel-player-name">{awayCurrentPlayerInfo.position} {awayCurrentPlayerInfo.playerName}</th>
                      </tr>
                    </table>

                    <Button variant="dark" className="d-inline-block mx-2" disabled>VS</Button>

                    <table className="d-inline-block">
                      <tr>
                        <th className="panel-score" rowSpan={2}>{gameData.homeTeam.score}</th>
                        <th className="panel-team-name">{homeCurrentPlayerInfo.teamName}</th>
                      </tr>
                      <tr>
                        <th className="panel-player-name">{homeCurrentPlayerInfo.position} {homeCurrentPlayerInfo.playerName}</th>
                      </tr>
                    </table>
                  </Jumbotron>
                </Card.Body>
                {/*<Card.Body>*/}
                {/*  <Row>*/}
                {/*    <iframe className="w-100" height="450px" src="https://www.youtube.com/embed/PwNXY5zeoc0"*/}
                {/*            frameBorder="0"*/}
                {/*            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
                {/*            allowFullScreen/>*/}
                {/*  </Row>*/}
                {/*</Card.Body>*/}
              </Card>

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
  }

  return (
      <div className="App">
        <MainHeader/>

        {GameRenderer(isFetched)}

        <MainFooter/>
      </div>
  );
}

export default Game;
