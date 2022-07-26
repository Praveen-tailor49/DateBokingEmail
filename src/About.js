import React, { useState, useRef } from 'react';
import NavBar from './NavBar';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser"

const About = ({ date, time, id }) => {

    const [title, setTitle] = useState('')
    const [about, setAbout] = useState('')
    const [schedule, setSchedule] = useState('')
    const navigate = useNavigate()

    var endtime = time.slice(0, 3) + " " + schedule;
    
    const form = useRef();
    const sendData = () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "title": title, "date": date.toString().slice(0, 15), "time": time, "about": about, 'endTime': endtime , btn: id});

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://json-database-datebooking.herokuapp.com/schedule", requestOptions)
            .then(response => response.json())
            .then(result => {
                navigate('/thank-you')
            })
            .catch(error => console.log('error', error));
    }


    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_n0n3cu5','template_p3zgblv', e.target, "45joN3WoSJXnEQYhG")
          .then((result) => {
              console.log(result.text);
              sendData()
          }, (error) => {
              console.log(error.text);  
          });
      }

    //   const sendData1 = () => {

    //   }

    return (
        <>
            <NavBar />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Form className='form_div' style={{ width: '30%', boxShadow: '1px 10px 5px #888888'}}  ref={form} onSubmit={sendEmail}>
                    <div style={{ margin: '20px' }}>

                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>date</Form.Label>
                            <Form.Control style={{border:'none'}} type="text" value={date.toString().slice(0, 15)}  name='date' onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>time</Form.Label>
                            <Form.Control  value={time} style={{border:'none'}}  type="text"  name='time' onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control    type="text" placeholder="Enter name" name='name'/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control    type="text" placeholder="Enter email" name='email'/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" name='title' onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Label>About Program</Form.Label>
                        <FloatingLabel controlId="floatingTextarea2">
                            <Form.Control
                            name='about'
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </FloatingLabel>

                        <Form.Group controlId="formGridState">
                            <Form.Label>Meeting Schedule</Form.Label>
                            <Form.Select defaultValue="Choose..." onChange={(e) => setSchedule(e.target.value)} name='schedule'>
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

                        <Link to='/'><Button variant="primary" id='about_btn'   style={{ marginLeft: '50px' }}>
                            Back
                        </Button></Link>
                        {/* <Link to='/thank-you'><Button variant="primary" id='about_btn'  style={{ marginLeft: '50px' }} onClick={sendData}>
                            Comfirm
                        </Button></Link> */}
                       <Button variant="primary"  type="submit" id='about_btn' style={{ marginLeft: '50px' }}>
                            Send mail
                        </Button>

                    </div>

                </Form>
            </div>
        </>
    )
}

export default About
