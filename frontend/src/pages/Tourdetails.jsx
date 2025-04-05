import React from 'react'
import '../styles/tour-details.css'
import { Container, Row, Col, Form, FormGroup, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
import tourData from '../assets/data/tours'
import calculateAvgRating from '../utils/avgRating'

const Tourdetails = () => {
  const { id } = useParams()
  // this is an static data later we will call our API and load our data from db
  const tour = tourData.find(tour => tour.id === id)
  // destructure properties from tour object
  const { photo, title, desc, price, reviews, address, city, distance, maxGroupSize } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews)
  return (
    <section>
      <Container>
        <Row>
          <Col lg='8'>
            <div className="tour__content">
              <img src={photo} alt='img' />
              <div className="tour__info">
                <h2>{title}</h2>
                <div className='d-flex align-items-center gap-5'>

                  <span className='tour__rating d-flex align-items-center gap-1'>
                    <i class="ri-star-fill" style={{ 'color': "var(--secondary-color)" }}></i>{calculateAvgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? 'Not Rated' : <span>({reviews?.length})</span>}

                  </span>

                  <span>
                    <i class="ri-map-pin-fill"></i>{address}
                  </span>
                </div>

                <div className="tour__extra-details">
                  <span><i class="ri-map-pin-2-line"></i> {city}</span>
                  <span><i class="ri-money-dollar-circle-line"></i> ${price}/per person</span>
                  <span><i class="ri-group-line"></i>{maxGroupSize}</span>
                </div>
                <h5>Description</h5>
                <p>{desc}</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Tourdetails;