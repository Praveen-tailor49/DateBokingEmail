import React, { useState } from 'react';
import NavBar from './NavBar';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { Link } from "react-router-dom";

const About = ({date, time}) => {

    const [title, setTitle] = useState('')
    const [about, setAbout] = useState('')
    const [schedule, setSchedule] = useState('')

    var endtime = time.slice(0,3)+" "+schedule;
    const sendData = () => {
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "title": title, "date": date.toString().slice(0,15), "time": time, "about":about, 'endTime':endtime });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://json-database-datebooking.herokuapp.com/schedule", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <NavBar />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Form style={{ width: '30%', boxShadow: '1px 10px 5px #888888', marginTop: '10%' }}>
                    <div style={{ margin: '20px' }}>

                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" onChange={(e)=> setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Label>About Program</Form.Label>
                        <FloatingLabel controlId="floatingTextarea2">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                                onChange={(e)=> setAbout(e.target.value)}
                            />
                        </FloatingLabel>

                        <Form.Group controlId="formGridState">
                            <Form.Label>Meeting Schedule</Form.Label>
                            <Form.Select defaultValue="Choose..." onChange={(e)=> setSchedule(e.target.value)}>
                                <option>Choose...</option>
                                <option>5 min</option>
                                <option>10 min</option>
                                <option>15 min</option>
                                <option>30 min</option>
                                <option>45 min</option>
                                <option>60 min</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>

                        <Link to='/'><Button variant="primary" type="submit" style={{ marginLeft: '50px' }}>
                            Back
                        </Button></Link>
                        <Link to='/thank-you'><Button variant="primary" type="submit" style={{ marginLeft: '50px' }} onClick={sendData}>
                            Comfirm
                        </Button></Link>
                        <Link to='/view-events'><Button variant="primary" type="submit" style={{ marginLeft: '50px' }}>
                            View All Events
                        </Button></Link>
                    </div>

                </Form>
            </div>
        </>
    )
}

export default About
