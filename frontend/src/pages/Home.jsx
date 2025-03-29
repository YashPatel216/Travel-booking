import React from 'react'
import '../styles/home.css'
import {container,row,col} from 'reactstrap';
import heroImg from '../assests/images/hero-img01.jpg'
import heroImg02 from '../assests/images/hero-img02.jpg'
import heroVideo from '../assests/images/hero-video.jpg'

const Home = () => {
  return (
    <>
    <section>
      <Container>
        <Row>
          <Col lg='6'>
          <div className="hero__content"></div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}

export default Home;