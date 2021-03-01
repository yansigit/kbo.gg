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
      <Container fluid>
        <Row>
          <Col xl={{span:2, order: 'first'}}>
            <MainSideBar className="mt-4" />
          </Col>
          <Col xl={{span: 8}} lg={{order: 'first'}}>
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

            <Card className="rounded-0 mt-4">
              <Card.Body>
                뭐넣지
              </Card.Body>
            </Card>
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
