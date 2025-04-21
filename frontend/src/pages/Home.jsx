import React from 'react'
import '../styles/home.css'
import { Container, Row, Col } from 'reactstrap';
import heroImg01 from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import Subtitle from './../shared/Subtitle'
import worldImg from '../assets/images/world.png'
import SearchBar from '../shared/SearchBar';
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../Featured-tours/FeaturedTourList';
import experienceImg from  "../assets/images/experience.png"
import MasonryImagesGallery from '../components/image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonial/Testimonial';
import Newsletter from '../shared/Newsletter';
const Home = () => {
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={'Know Before You Go'} />
                  <img src={worldImg} alt="Img" />
                </div>
                <h1> Dream It. Plan It. Experience It. Your Travel Made Easy.</h1>
                <p>Stop dreaming and start traveling. Travel World simplifies your journey from inspiration to reality. Find incredible destinations, book your perfect trip, and let us handle the details. Your next adventure is just a click away.</p>
              </div>
            </Col>
            <Col lg='2'>
              <div className="hero__img-box">
                <img src={heroImg01} alt='img' />
              </div>
            </Col>
            <Col lg='2'>
              <div className="hero__img-box  mt-4">
                <video src={heroVideo} controls />
              </div>
            </Col>

            <Col lg='2'>
              <div className="hero__img-box mt-5" >
                <img src={heroImg02} alt='img' />
              </div>
            </Col>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='3'>
              <h5 className="services__subtitle">What We Serve</h5>
              <h2 className="services__title">We Offer Our Best Services</h2></Col>
            <ServiceList />
          </Row>

        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured_tour-title">Our featured tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
<section>
  <Container>
    <Row>
      <Col lg='6'>
      <div className="experience__content">
        <Subtitle subtitle={'Experience'}></Subtitle>
        <h2>With Our all experience <br/> we will serve you </h2>
        <p>With years of trusted experience, we are committed to delivering the best travel services for every journey you take. <br/>
         </p>
        </div>
        <div className="counter__wrapper d-flex align-item-center gap-5">
          <div className="counter__box">
            <span>12k+</span>
            <h6>Successfull Trip</h6>
          </div>
          <div className="counter__box">
            <span>2k+</span>
            <h6>Regular Clients</h6>
          </div>
          <div className="counter__box">
            <span>10</span>
            <h6>Years Experience </h6>
          </div>
        </div>
        </Col>
      <Col lg='6'>
      <div className="experience__img">
        <img src={experienceImg} /></div></Col>
    </Row>
  </Container>
</section>
<section>
  <Container>
    <Row>
      <Col lg='12'>
      <Subtitle subtitle={'Gallery'}/>
      <h2 className='gallery__title'>Visit our customers tour gallery </h2>
      </Col>
      <Col lg='12'>
        <MasonryImagesGallery/>
      </Col>
    </Row>
  </Container>
</section>


<section>
<Container>
<Row>
<Col lg='12'>
<Subtitle subtitle={'Fans Love'} />
<h2 className="testimonial_title">What our fans say about us</h2>
</Col>
<Col lg='12'>
  <Testimonials/>
</Col>
</Row>
</Container>
</section>
<Newsletter/>
    </>
  )
};
export default Home;