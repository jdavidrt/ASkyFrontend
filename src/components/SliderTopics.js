import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SliderTopics = ({ sliderItems }) => {
    var settings = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        speed: 2000,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        loop: true,
        cssEase: "linear",
        responsive: [
          {
            breakpoint: 1760,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 1460,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 1290,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
    
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
        ],
      };

  return (
    <div 
    className="container m-auto py-20 "
    style={{ backgroundImage: "linear-gradient(to bottom, #EEF7FB 0%, #E0F3FB 100%)" }}
    >   
    <div className="px-3">
      <div className=" max-w-sm  md:max-w-5xl xl:max-w-6xl px-5 lg:px-14 overflow-auto mx-auto bg-white rounded-2xl z-20 "
      style={{
        boxShadow: "#48AFDE -10px 25px 50px 10px"
      }}>
        <div className="lg:py-10 md:py-6 sm:py-6 cursor-all-scroll ">
            <Slider {...settings}>
            {sliderItems.map((item) => (
            <img src={item.url} alt={item.name} className="h-15 px-2 transition duration-300 filter grayscale hover:grayscale-0"/>
            ))}
        </Slider>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SliderTopics