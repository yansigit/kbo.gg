import React from "react";
import {MainHeader} from "../../components/MainHeader";
import MainFooter from "../../components/MainFooter";
import {Card, Container, Accordion, Button, ListGroup} from "react-bootstrap";

export default class History extends React.Component {
  render() {
    return (
      <>
        <MainHeader />
        <h2 className="text-center my-4">과거 경기 기록</h2>
        <Container>
          <Accordion defaultActiveKey="0" className="rounded-0">
            <Card className="rounded-0 text-center">
              <Card.Header className="rounded-0 bg-dark">
                <Accordion.Toggle as={Button} variant="link" eventKey="0" className="text-white">
                  2021년 기록
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>2021.XX.XX / 잠실 경기장 : 테스트 VS 테스트</ListGroup.Item>
                    <ListGroup.Item>2021.XX.XX / 사직 경기장 : 테스트 VS 테스트</ListGroup.Item>
                    <ListGroup.Item>2021.XX.XX / 잠실 경기장 : 테스트 VS 테스트</ListGroup.Item>
                    <ListGroup.Item>2021.XX.XX / 사직 경기장 : 테스트 VS 테스트</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="rounded-0 text-center">
              <Card.Header className="rounded-0 bg-dark">
                <Accordion.Toggle as={Button} variant="link" eventKey="1" className="text-white">
                  2020년 기록
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  2020년 이전 기록은 지원되지 않습니다
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Container>

        <MainFooter />
      </>
    );
  }
}