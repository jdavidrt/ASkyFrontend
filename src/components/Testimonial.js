import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { testimonials } from "../data/testimonials";

const Testimonial = () => {
    var settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 3000,
        arrows: false,
        autoplay: true,
        centerMode: true,
        centerPadding: "10px",
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1760,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 1460,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    centerMode: true,
                    centerPadding: "10px",
                },
            },
            {
                breakpoint: 1290,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    centerMode: true,
                    centerPadding: "10px",
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    centerMode: false,
                },
            },
        ],
    };

    return (
        <div id="testimonial" className="pb-20">
            <div
                className="bg-[#E0F3FB] py-12 lg:px-12 md:px-5 px-3 rounded-lg"
                style={{ backgroundImage: "linear-gradient(-16deg, #EEF7FB 0 50%, white 0% 100%)", width: "100%" }}
            >
                <div className="lg:container mx-auto px-0">
                    <div className="text-center">
                        <h2 className="font-extrabold text-4xl md:text-5xl mb-6 text-[#48AEDD]">
                            Lo que dicen nuestros usuarios
                        </h2>
                        <p className="max-w-2xl font-[200] font-recoletaBold mx-auto mb-12 lg:mb-24 text-lg md:text-xl">
                            Nuestros usuarios y expertos valoran la calidad de nuestras respuestas y el impacto que generamos en su aprendizaje. Lee lo que dicen sobre cómo Asky les ha ayudado a resolver sus dudas y mejorar sus conocimientos.
                        </p>
                    </div>

                    {/* Testimonial Slider */}
                    <Slider {...settings} className="cursor-all-scroll">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="slider-card flex" style={{ paddingLeft: "0px" }}>
                                <div
                                    className="bg-white sm:w-[95%] w-[100%] pl-5 pr-5 md:pl-20 md:pr-20 m-auto rounded-2xl p-4 lg:p-6 min-h-[250px] h-full flex flex-col justify-between"
                                    style={{ backgroundImage: "linear-gradient(5deg, rgb(193, 227, 243) 0 10%, white 0% 100%)" }}
                                >
                                    <div className="flex flex-col md:flex-row">
                                        <div className="min-w-[100px] mb-4 md:mb-0">
                                            <img className="h-20 w-20 rounded-full" src={testimonial.image} alt={testimonial.name} />
                                        </div>
                                        <div className="flex flex-col gap-x-4 md:flex-col mb:items-center">
                                            <div className="font-medium text-base">{testimonial.name}</div>
                                            <div className="font-[300] font-medium text-[#48AEDD]">{testimonial.role}</div>
                                            <p className="mb-6 font-[200] font-recoletablack min-h-[70px] text-[15px] mt-3">
                                                {testimonial.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;