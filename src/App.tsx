import React, {useEffect} from 'react';
import './App.css';
import {Card, Col, Container, Row} from "react-bootstrap";
import {MainHeader} from "./MainHeader";
import {MainSideBar} from "./MainSideBar";
import DataStore from "./store";
import {Line} from "react-chartjs-2";

function App() {
  useEffect(() => {})

  const options = {
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

  return (
    <div className="App">
      <MainHeader />
      <Container fluid>
        <Row>
          <Col xl={{span:2, order: 'first'}}>
            <MainSideBar className="mt-4" />
          </Col>
          <Col xl={{span: 8}} xs={{order: 'first'}}>
            <Card className="rounded-0 mt-4">
              <Card.Header>
                실시간 경기
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <iframe className="w-100" height="450px" src="https://www.youtube.com/embed/PwNXY5zeoc0" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                  </Col>
                  <Col>
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
                    <Line data={DataStore.data} options={options} />
                  </Card.Body>
                </Card>
              </Col>
              <Col md="6">
                <Card className="rounded-0 mt-4">
                  <Card.Header className="bg-primary text-white">
                    HOME팀 승리확률
                  </Card.Header>
                  <Card.Body>
                    <Line data={DataStore.data} options={options} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>

          </Col>
          <Col xl={2}>
            <MainSideBar className="mt-4" />
          </Col>
        </Row>
      </Container>
      <div className="footer bg-primary w-100 mt-4">
        <h4 className="text-white">KBO.GG</h4>
      </div>
    </div>
  );
}

export default App;
