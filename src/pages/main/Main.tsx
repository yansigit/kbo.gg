import React from "react";
import {MainHeader} from "../../components/MainHeader";
import {Container, Jumbotron, InputGroup, FormControl, Button, Col, Row, ListGroup, Card} from "react-bootstrap";
import MainFooter from "../../components/MainFooter";
import './main.scss';

export default class Main extends React.Component {
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
                <Card.Header className="font-weight-bold text-center">최근 경기 내역</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <Card.Header className="font-weight-bold text-center">테스트</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md="6">
              <Card className="rounded-0">
                <Card.Header className="font-weight-bold text-center">테스트</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <Card.Header className="font-weight-bold text-center">테스트</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                  <ListGroup.Item>테스트</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

        </Container>

        <MainFooter />
      </div>
    );
  }
}