import React, {useEffect} from 'react';
import './App.css';
import {Card, Col, Container, Row} from "react-bootstrap";
import {MainHeader} from "./MainHeader";
import {MainSideBar} from "./MainSideBar";

function App() {
  useEffect(() => {})

  return (
    <div className="App">
      <MainHeader />
      <Container fluid className="mt-4">
        <Row>
          <Col sm={3} lg={2}>
            <MainSideBar />
          </Col>
          <Col sm={6} lg={8}>
            <Card className="rounded-0">
              <Card.Header>
                실시간 경기 영상
              </Card.Header>
              <Card.Body>
                <iframe className="w-100" height="450px" src="https://www.youtube.com/embed/PwNXY5zeoc0" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
              </Card.Body>
            </Card>
            <Card className="rounded-0 mt-4">
              <Card.Body>
                <iframe className="w-100" height="500px" frameBorder="0" src="https://sports.news.naver.com/gameCenter/miniTextRelay.nhn?category=kbo&date=20201124&gameId=77771124OBNC02020" />
              </Card.Body>
            </Card>
          </Col>
          <Col sm={3} lg={2}>
            <MainSideBar />
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
