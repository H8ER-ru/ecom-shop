import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../actions/userActions";

function Header(props) {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    console.log(userInfo)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logOut())
    }

    return (
        <Navbar bg="primary" variant="primary" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Ecom Shop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                <i className="fas fa-shopping-cart"/> Cart
                            </Nav.Link>
                        </LinkContainer>

                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Log Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        ): (
                            <LinkContainer to="/login">
                                <Nav.Link >
                                    <i className="fas fa-user"/> Login
                                </Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;