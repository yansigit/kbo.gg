import React from "react";
import {Card, Col, Row} from "react-bootstrap";
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
                        <img src="//via.placeholder.com/150" alt="선수 사진" className="w-100 h-100"
                             style={{maxHeight: "150px", maxWidth: "150px"}}/>
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
                {/*<Table striped bordered hover size="sm" className="m-0">*/}
                {/*    <tbody>*/}
                {/*    <tr>*/}
                {/*        <td>타석</td>*/}
                {/*        <td>{this.props.currentPlayer.tasuk}</td>*/}
                {/*        <td>타수</td>*/}
                {/*        <td>{this.props.currentPlayer.tasu}</td>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <td>안타</td>*/}
                {/*        <td>{this.props.currentPlayer.anta}</td>*/}
                {/*        <td>피삼진</td>*/}
                {/*        <td>{this.props.currentPlayer.pisamjin}</td>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <td>타점</td>*/}
                {/*        <td>{this.props.currentPlayer.tajum}</td>*/}
                {/*        <td>홈런</td>*/}
                {/*        <td>{this.props.currentPlayer.homerun}</td>*/}
                {/*    </tr>*/}
                {/*    </tbody>*/}
                {/*</Table>*/}
            </Card.Body>
        </Card>
    }
}