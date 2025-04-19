import React, { useState, useContext, useEffect } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config.js';

const Booking = ({ tour, avgRating }) => {
    const { price, reviews, title } = tour;
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [booking, setBooking] = useState({
        userId: user && user._id,
        userEmail: user && user.email,
        tourName: title,
        fullName: '',
        phone: '',
        guestSize: 1,
        bookAt: '',
    });

    const [minDate, setMinDate] = useState('');

    useEffect(() => {
        // Set the minimum selectable date to today
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);
    }, []);

    const handleChange = (e) => {
        setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const servicefee = 10;
    const totalamount = Number(price) * Number(booking.guestSize) + Number(servicefee);

    //send data to server
    const handleClick = async (e) => {
        e.preventDefault();

        console.log(booking);
        try {
            if (!user || user === undefined || user === null) {
                return alert('please Sign in');
            }

            const res = await fetch(`${BASE_URL}/booking`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(booking),
            });

            const result = await res.json();

            if (!res.ok) {
                return alert(result.message);
            }
            navigate('/thank-you');
        } catch (err) {
            alert(err.message); // Use err.message for the actual error message
        }
    };

    return (
        <div className="booking">
            <div className="booking__top d-flex align-items-center justify-content-between">
                <h3>
                    ${price} <span>/per person</span>
                </h3>
                <span className="tour__rating d-flex align-items-center">
                    <i className="ri-star-fill"></i>
                    {avgRating === 0 ? null : avgRating} ({reviews?.length})
                </span>
            </div>

            <div className="booking__form">
                <h5>Information</h5>
                <Form className="booking__info-form" onSubmit={handleClick}>
                    <FormGroup>
                        <input
                            type="text"
                            placeholder="Full Name"
                            id="fullName"
                            required
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <input
                            type="number"
                            placeholder="phone"
                            id="phone"
                            required
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="d-flex align-items-center gap-3">
                        <input
                            type="date"
                            placeholder=""
                            id="bookAt"
                            required
                            onChange={handleChange}
                            min={minDate} // Set the minimum date here
                        />
                        <input
                            type="number"
                            placeholder="Guest"
                            id="guestSize"
                            required
                            onChange={handleChange}
                            min="1" // Ensure at least one guest
                        />
                    </FormGroup>
                </Form>
            </div>

            <div className="booking__bottom">
                <ListGroup>
                    <ListGroupItem className="border-0 px-0">
                        <h5 className="d-flex align-items-center gap-1">
                            ${price} <i className="ri-close-line"></i>1 person
                        </h5>
                        <span>${price}</span>
                    </ListGroupItem>

                    <ListGroupItem className="border-0 px-0">
                        <h5>Service Charge</h5>
                        <span>${servicefee}</span>
                    </ListGroupItem>

                    <ListGroupItem className="border-0 px-0 total">
                        <h5>Total</h5>
                        <span>${totalamount}</span>
                    </ListGroupItem>

                    <button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
                        Book Now
                    </button>
                </ListGroup>
            </div>  
        </div>
    );
};

export default Booking;