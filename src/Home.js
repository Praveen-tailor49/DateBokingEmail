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
    const [id, setId] = useState('');
    const [button, setButton] = useState([]);
    const [booking, setBooking] = useState([]);
    

    useEffect(() => {
        meeting_Button();
        bookingData();
    },[])

    const meeting_Button = () =>{
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://json-database-datebooking.herokuapp.com/time", requestOptions)
            .then(response => response.json())
            .then(result => setButton(result))
            .catch(error => console.log('error', error));
    }

    const bookingData = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://json-database-datebooking.herokuapp.com/schedule", requestOptions)
            .then(response => response.json())
            .then(result => setBooking(result))
            .catch(error => console.log('error', error));
    }

    const handleShow = (e) => {
        setDate(e)

        enbaleButton()

        dis(e)
        document.getElementById('show').style.display = 'block';

    }

    const getTime = (e, id) => {
        setTime(e)
        setId(id)
    }

    const show = () => {
        document.getElementById('showButton').style.display = 'block';
    }

    const enbaleButton = () => {
        button.forEach(data => {
            document.getElementById(data.id).disabled = false;
        })
    }

    const dis = (d = date) => {


        booking.forEach(val => {
            if (d.toString().slice(0, 15) === val.date) {
                document.getElementById(val.btn).disabled = true;
            }
        })
    }


    return (
        <>
            <NavBar />

            <div className= 'main_div'  style={{ display: 'flex', justifyContent: 'center' }}>

                <div  style={{marginTop: "5%", marginBottom: '1%' }}>
                    <h1 style={{ marginBottom: '10%' }}>Schedule Events</h1>
                    <Calendar
                        value={date}
                        onClickDay={handleShow}
                        onClickMonth={handleShow}
                        minDate={new Date()}
                        tileDisabled={({ date }) =>
                            date.getDay() === 0 || date.getDay() === 6
                        }
                    />
                </div>

                <div id='show' style={{  marginLeft: '100px', marginTop: "9%", display: 'none' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gridGap: '20px' }}>

                        {
                            booking.length !== 0 ?
                            button.map(data => {
                                return (
                                    <>
                                        <Button variant="primary" id={data.id} value={data.time} style={{ width: '100px', marginTop: "5px" }} onClick={(e) => { getTime(e.target.value, data.id); show() }} >
                                            {data.time}
                                        </Button>
                                    </>
                                )
                            })
                            :
                            button.map(data => {
                                return (
                                    <>
                                        <Button variant="primary" value={data.time} style={{ width: '100px', marginTop: "5px" }} onClick={(e) => { getTime(e.target.value, data.id); show() }} >
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
                    <Link to='/abouts'> <Button variant="primary" value='4.30' style={{ width: '100px', marginLeft: "10px", }} onClick={() => sendData(date, time, id)}>
                        Comfirm
                    </Button></Link>
                </div>
            </div>
            <div style={{ marginTop: '50px' }}  class='table_div'>

                <Meeting date={date} />
            </div>
        </>
    )
}

export default Home
