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
          <Col>
            <MainSideBar />
          </Col>

          <Col xs={5}>2</Col>

          <Col>
            <MainSideBar />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
