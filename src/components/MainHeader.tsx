import React from "react";
import {Container, Jumbotron, Nav, Navbar, NavDropdown, Figure} from "react-bootstrap";
import kbo_logo from "../res/kbo-logo-itself.png"
import {IoHome, IoPlayForward, IoPodiumSharp} from 'react-icons/io5';

export class MainHeader extends React.Component {
    image: HTMLImageElement | null = null;

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <>
                <Navbar id="header-top-navbar" className="p-0" bg="dark" variant="dark" expand="lg">
                    <Nav className="justify-content-center w-100" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link href="/"><IoHome size="20" color="#fff" />메인</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/game"><IoPlayForward size="20" color="#fff" />현재 시즌</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/history"><IoPodiumSharp size="20" color="#fff" />과거 내역</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                <div style={{backgroundImage: "url('/banner.jpg')", backgroundPositionY: "center"}}>
                    <Jumbotron className="mb-0 rounded-0 bg-transparent">
                        <Container>
                            <div className="d-flex align-items-center">
                                <img src={kbo_logo} width="30" height="30" alt="" />
                                <h3 className="text-light m-0 ml-2 font-weight-bold">KBO.GG</h3>
                                <h3 className="text-light m-0 ml-2">크보지지</h3>
                            </div>
                        </Container>
                    </Jumbotron>
                    <Navbar variant="dark" expand="lg" className="bg-dark-transparent py-1">
                        <Nav className="justify-content-center w-100" activeKey="/home">
                            <Nav.Item>
                                <Nav.Link href="/">메인</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/game">현재 시즌</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/history">과거 내역</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="disabled" disabled>
                                    테스트
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                </div>
            </>
        )
    }
}