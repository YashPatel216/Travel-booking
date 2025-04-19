import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'

import Home from '../pages/Home';
import Tours from '../pages/Tours';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Searchresult from '../pages/SearchResult';
import Tourdetails from '../pages/TourDetails';
import ThankYou from '../pages/ThankYou';
import MyBookings from '../pages/my-Booking';
import AdminPanel from '../pages/AdminPanel';

const Routers = () => {
  return (
     <Routes>
        <Route path='/' element={<Navigate to='/Home'/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/thank-you' element={<ThankYou/>} />
        <Route path='/tours' element={<Tours/>} />
        <Route path='/tours/:id' element={<Tourdetails/>} />
        <Route path='/tours/search' element={<Searchresult/>} />
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path="/admin" element={<AdminPanel />} />
     </Routes>
  );
};

export default Routers;