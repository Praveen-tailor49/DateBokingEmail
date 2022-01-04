import React from 'react'
import { Navbar, Container } from 'react-bootstrap';

const NavBar = () => {
    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Schedule Events</Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar
