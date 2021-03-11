import React from "react";
import {Card, Col, Row, Table} from "react-bootstrap";
import {Line} from "react-chartjs-2";
import DataStore from "./store";
import {SideBarProps} from "./interfaces/interfaces";

export class MainSideBar extends React.Component<SideBarProps> {
    options = {
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

    constructor(props: any) {
        super(props);
    }

    render() {
        let bg_image = "/logo_ds.png";

        return <Card className={'rounded-0 ' + this.props.className}>
            <Card.Header>
                {this.props.currentPlayer.teamName} 타자
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col md={4}>
                        <img width="50px" className="border border-dark"
                             src="https://sports-phinf.pstatic.net/player/kbo/default/76267.png"/>
                    </Col>
                    <Col md={8}>
                        <Card.Title as="p">{this.props.currentPlayer.playerName}</Card.Title>
                        <Card.Text>
                            테스트 테스트
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Body>
                <Table striped bordered hover size="sm" className="m-0">
                    <tbody>
                    <tr>
                        <td>타석</td>
                        <td>{this.props.currentPlayer.tasuk}</td>
                        <td>타수</td>
                        <td>{this.props.currentPlayer.tasu}</td>
                    </tr>
                    <tr>
                        <td>안타</td>
                        <td>{this.props.currentPlayer.anta}</td>
                        <td>피삼진</td>
                        <td>{this.props.currentPlayer.pisamjin}</td>
                    </tr>
                    <tr>
                        <td>타점</td>
                        <td>{this.props.currentPlayer.tajum}</td>
                        <td>홈런</td>
                        <td>{this.props.currentPlayer.homerun}</td>
                    </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    }
}