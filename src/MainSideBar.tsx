import React from "react";
import {Card, Col, Row, Table} from "react-bootstrap";
import {Line} from "react-chartjs-2";
import DataStore from "./store";

export class MainSideBar extends React.Component {
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

    constructor(props: {} | Readonly<{}>) {
        super(props);
    }

    render() {
        return <div><Card>
            <Card.Header>
                두산 베어스 타자
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <img className="border border-dark w-100"
                             src="https://sports-phinf.pstatic.net/player/kbo/default/76267.png"/>
                    </Col>
                    <Col xs={8}>
                        <Card.Title>최주환</Card.Title>
                        <Card.Text>
                            <Table striped bordered hover size="sm">
                                <tbody>
                                <tr>
                                    <td>타석</td>
                                    <td>1</td>
                                    <td>타수</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>안타</td>
                                    <td>1</td>
                                    <td>피삼진</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>타점</td>
                                    <td>1</td>
                                    <td>홈런</td>
                                    <td>1</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

            <Card className="mt-4">
                <Card.Body>
                    <Card.Text className={'font-weight-bold'}>승리 확률</Card.Text>
                    <Line data={DataStore.data} options={this.options}/>
                </Card.Body>
            </Card></div>
    }
}