import React from "react";
import {MainHeader} from "../components/MainHeader";
import {Container, Jumbotron, InputGroup, FormControl, Button, Col, Row, ListGroup, Card} from "react-bootstrap";
import './main.css';

export class Main extends React.Component {
  render() {
    return (
      <div className="app">
        <MainHeader />

        <div className="w-100 notification-bar text-center py-2">
          <h5>(공지) 현재 잠실 경기장에서 두산 VS 롯데 매치가 진행중입니다</h5>{' '}<a href="#">[바로가기]</a>
        </div>

        <Jumbotron id="main-search-jumbotron" className="rounded-0 text-center" fluid>
          <img src="https://via.placeholder.com/400x100" className="mb-3" />
          <InputGroup>
            <FormControl
              placeholder="게임 검색"
              aria-label="게임 검색"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="warning" className="font-weight-bold">검색</Button>
            </InputGroup.Append>
          </InputGroup>
        </Jumbotron>

        <Container>
          <Row>
            <Col md="6">
              <Card className="rounded-0">
                <Card.Header>Featured</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <Card.Header>Featured</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>

        <footer className="footer bg-dark w-100 mt-4">
          <Container fluid>
            <h4 className="text-white">KBO.GG</h4>
          </Container>
        </footer>
      </div>
    );
  }
}