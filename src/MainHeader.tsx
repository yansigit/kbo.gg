import React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

export class MainHeader extends React.Component {
    render() {
        return <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand href="#" className="font-weight-bold">KBO.GG</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    }
}