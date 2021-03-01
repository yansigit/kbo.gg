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

    constructor(props: any) {
        super(props);
    }

    render() {
        let bg_image = "/logo_ds.png";

        return <div><Card className="rounded-0">
            <Card.Header>
                두산 베어스 타자
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col md={4}>
                        <img width="50px" className="border border-dark"
                             src="https://sports-phinf.pstatic.net/player/kbo/default/76267.png"/>
                    </Col>
                    <Col md={8}>
                        <Card.Title as="p">최주환</Card.Title>
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
            </Card.Body>
        </Card>

        <Card className="mt-4 rounded-0">
            <Card.Body>
                <Card.Text className={'font-weight-bold'}>승리 확률</Card.Text>
                <Line data={DataStore.data} options={this.options}/>
            </Card.Body>
        </Card>
        </div>
    }
}