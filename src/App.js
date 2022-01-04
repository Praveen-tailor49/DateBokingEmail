import React, {useState} from 'react';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import End from './End';
import AllEvent from './AllEvent';
import About from './About';
import Thankyou from './Thankyou';


function App() {

  const [date, setDate] = useState('');
    const [time, setTime] = useState('');

  const sendData = (date, time) => {
    setDate(date)
    setTime(time)
  }
  
  return (
    <>
   
      <Routes>
        <Route exact path='/' element={<Home sendData={sendData} />} />
        <Route exact path='/complete' element={<End  />} />
        <Route exact path='/view-events' element={<AllEvent  />} />
        <Route exact path='/abouts' element={<About date={date} time={time} />} />
        <Route exact path='/thank-you' element={<Thankyou  />} />

      </Routes>
    </>
  );
}

export default App;


