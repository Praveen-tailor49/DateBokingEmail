import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './App.css'
import NavBar from './NavBar';
import Meeting from './Meeting';


const Home = ({ sendData }) => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [button, setButton] = useState([]);
    

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://json-database-datebooking.herokuapp.com/time", requestOptions)
            .then(response => response.json())
            .then(result => setButton(result))
            .catch(error => console.log('error', error));
    },[])

    const handleShow = (e) => {
        setDate(e)

        document.getElementById('show').style.display = 'block';

    }

    const getTime = (e) => {
        setTime(e)
    }

    const show = () => {
        document.getElementById('showButton').style.display = 'block';
    }



    return (
        <>
            <NavBar />

            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <div style={{ marginTop: "5%", marginBottom: '1%' }}>
                    <h1 style={{ marginBottom: '10%' }}>Schedule Events</h1>
                    <Calendar
                        value={date}
                        onClickDay={handleShow}
                        onClickMonth={handleShow}
                    />
                </div>

                <div id='show' style={{ width: '10%', marginLeft: '100px', marginTop: "9%", display: 'none' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '20px' }}>

                        {
                            button.map(data => {
                                return (
                                    <>
                                        <Button variant="primary" value={data.time} style={{ width: '100px', marginTop: "5px" }} onClick={(e) => { getTime(e.target.value); show() }} >
                                            {data.time}
                                        </Button>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div id='showButton' style={{ marginLeft: '20px', marginTop: "50px", display: 'none' }}>
                    <Button variant="primary" value='3.30' style={{ width: '100px' }}>
                        Cencal
                    </Button>
                    <Link to='/abouts'> <Button variant="primary" value='4.30' style={{ width: '100px', marginLeft: "10px", }} onClick={() => sendData(date, time)}>
                        Comfirm
                    </Button></Link>
                </div>
            </div>
            <div style={{ marginTop: '50px' }}>

                <Meeting date={date} />
            </div>
        </>
    )
}

export default Home
