import React from 'react'
import ServiceCard from './ServiceCard'
import {Col} from 'reactstrap'
import weatherImg from '../assets/images/weather.png'
import GuideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'
 
const serviceData=[
  {
    imgUrl:weatherImg,
    title:"Calculate weather",
    desc:"We provide accurate and real-time weather forecasts for your travel destinations so you can pack right and stay safe ,"
  },
  { 
    imgUrl: GuideImg,
    title: "Best Tour Guide",
    desc: "Our certified, knowledgeable, and friendly tour guides are passionate about creating unforgettable travel memories.",
  },
{
    imgUrl: customizationImg,
    title: "Customization",
    desc: "Customize your trip your way. We create personalized packages for solo travelers, families, and groups—just choose and go!",
},
]

const ServiceList = () => {
  return (
    serviceData.map((item,index)=> <Col lg='3' key={index}>
      <ServiceCard item={item}/>
    </Col>)
  )
}

export default ServiceList