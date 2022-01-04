import React from 'react'
import NavBar from './NavBar';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';




const Thankyou = () => {
    return (
        <>
            <NavBar />
            <header class="site-header" id="header">
                <h1 class="site-header__title" data-lead-id="site-header-title">THANK YOU!</h1>
            </header>

            <div class="main-content" style={{ textAlign: 'center' }}>
                <i class="fa fa-check main-content__checkmark" id="checkmark"></i>
                <p class="main-content__body" data-lead-id="main-content-body">Thank you for fixing Schedule</p>
                <Link to='/'><Button variant="primary" type="submit" style={{ marginTop: '50px' }}>
                    Home
                </Button></Link>
                <Link to='/view-events'><Button variant="primary" type="submit" style={{ marginTop: '50px', marginLeft:'10px' }}>
                    All Events
                </Button></Link>
                <Button variant="primary" type="submit" style={{ marginTop: '50px',  marginLeft:'10px' }}>
                  Add to Google Calender
                </Button>
            </div>
        </>
    )
}

export default Thankyou
