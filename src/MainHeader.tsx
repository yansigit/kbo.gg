import React from "react";
import {Container, Jumbotron, Nav, Navbar, NavDropdown} from "react-bootstrap";
import kbo_logo from "./res/kbo-logo-itself.png"

export class MainHeader extends React.Component {
    render() {
        return (
            <>
                <Navbar className="p-0" bg="dark" variant="dark" expand="lg">
                    <Nav className="justify-content-center w-100" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link href="/">메인</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">현재 시즌</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2">과거 내역</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="disabled" disabled>
                                테스트
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                <Jumbotron className="mb-0 rounded-0" style={{backgroundImage: "url('/banner.jpg')", backgroundPositionY: "center"}}>
                    <Container>
                        <div className="d-flex">
                            <img src={kbo_logo} width="30" height="30" alt="" />
                            <h3 className="text-light ml-2">KBO.GG</h3>
                            <h3 className="text-light ml-2">크보지지</h3>
                        </div>
                    </Container>
                </Jumbotron>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Nav className="justify-content-center w-100" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link href="/">메인</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">현재 시즌</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2">과거 내역</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="disabled" disabled>
                                테스트
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </>
        )
    }
}