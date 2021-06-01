import React from "react";
import {Card, Col, Row, Table} from "react-bootstrap";
import {SideBarProps} from "../interfaces/interfaces";

export class MainSideBar extends React.Component<SideBarProps> {
    private headerColor: string;

    constructor(props: any) {
        super(props);
        this.headerColor = "text-light "
        if (this.props.type === "away") {
            this.headerColor += "bg-danger"
        } else {
            this.headerColor += "bg-primary"
        }
    }


    render() {
        return <Card className={'rounded-0 ' + this.props.className}>
            <Card.Header className={this.headerColor}>
                {this.props.currentPlayer.teamName}
            </Card.Header>
            <Card.Body>
                <Row className="text-left">
                    <Col sm={5} className="pl-0 h-100">
                        <img
                            src={"/image/" + this.props.currentPlayer.teamName + "_" + this.props.currentPlayer.playerName + ".jpg"}
                            alt="선수 사진" className="w-100 h-100"
                            style={{maxHeight: "150px", maxWidth: "150px", border: '1px solid grey', margin: '3px'}}/>
                    </Col>
                    <Col sm={7} className="d-flex flex-column">
                        <table className="w-100 h-100">
                            <tr>
                                <td className="text-center font-weight-bold">{this.props.currentPlayer.playerName}</td>
                            </tr>
                            <tr>
                                <td className="text-center">{this.props.currentPlayer.position}</td>
                            </tr>
                        </table>
                    </Col>
                </Row>
                <Table bordered hover size="sm" className="m-0 mt-2">
                    <thead>
                    <tr>
                        <td className="font-weight-bold bg-dark text-white">타자 라인업</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.bat_lineup?.map(((value, index) => <tr>
                        <td>{value}</td>
                    </tr>))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    }
}