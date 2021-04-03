import React from "react";
import {MainHeader} from "../../components/MainHeader";
import MainFooter from "../../components/MainFooter";
import {Accordion, Card, Container, ListGroup} from "react-bootstrap";

export default function GameList() {
    return (
        <>
            <MainHeader/>
            <h2 className="text-center my-4">현재 시즌 내역</h2>
            <Container>
                <Accordion className="text-center">
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>2021.XX.XX / 잠실 경기장 : 테스트 VS 테스트</ListGroup.Item>
                            <ListGroup.Item>2021.XX.XX / 사직 경기장 : 테스트 VS 테스트</ListGroup.Item>
                            <ListGroup.Item>2021.XX.XX / 잠실 경기장 : 테스트 VS 테스트</ListGroup.Item>
                            <ListGroup.Item>2021.XX.XX / 사직 경기장 : 테스트 VS 테스트</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Accordion>
            </Container>

            <MainFooter/>
        </>
    )
}