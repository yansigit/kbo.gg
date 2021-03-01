import React, {useEffect} from 'react';
import './App.css';
import {Col, Container, Row} from "react-bootstrap";
import {MainHeader} from "./MainHeader";
import {MainSideBar} from "./MainSideBar";

function App() {
  useEffect(() => {})

  return (
    <div className="App">
      <MainHeader />
      <Container fluid className="mt-4">
        <Row>
          <Col xs={3}>
            <MainSideBar />
          </Col>
          <Col xs={6}>
            <div>
              <iframe className="w-100" height="450px" src="https://www.youtube.com/embed/PwNXY5zeoc0" frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen/>
            </div>
            <div>
              <iframe className="w-100" height="500px" frameBorder="0" src="https://sports.news.naver.com/gameCenter/miniTextRelay.nhn?category=kbo&date=20201124&gameId=77771124OBNC02020" />
            </div>
          </Col>
          <Col xs={3}>
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
