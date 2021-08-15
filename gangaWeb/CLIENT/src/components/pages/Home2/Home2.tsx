import React, { useState } from "react"
import Carousel from "react-bootstrap/Carousel"
import Complaint from "../../../utils/images/GenImages/complaints.png"
import Library from "../../../utils/images/GenImages/ganga_library.jpg"
import GangaTop from "../../../utils/images/GenImages/ganga_it_view.jpg"
import GangaTop2 from "../../../utils/images/GenImages/ganga_top_view_2.jpg"
import Butterfly from "../../../utils/images/GenImages/ganga_butterfly.jpg"
import "./Home.css"
function HeroSection() {
    return (
        <>
            <Carousel
                pause={false}
                interval={3000}
                touch={true}
                className="hero-container"
                controls={false}
                indicators={false}
            >
                <Carousel.Item>
                    <img className="d-block w-100 carousel-img" src={GangaTop} alt="First slide" />
                    <Carousel.Caption>Ganga Hostel</Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100 carousel-img" src={Complaint} alt="Third slide" />
                    <Carousel.Caption>Complaint Portal</Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100 carousel-img" src={Library} alt="Forth slide" />
                    <Carousel.Caption>Ganga Online Library</Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-img"
                        id="butterfly-img"
                        src={Butterfly}
                        alt="Fifth slide"
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className="slider-txt-bx animate__animated animate__fadeInLeft">
                <h6> WELCOME TO </h6>
                <h2>
                    official website
                    <br />
                    of Ganga
                </h2>
                {/* <p>The Centre for Innovation (CFI) was setup in 2008 through a donation by the batch of 1981 as the first-of-its kind, 24x7 student laboratory in India. CFI is where ideas are generated, prototypes are built and products are developed. Ten years since its inception, CFI has given rise to hundreds of projects and more than a dozen patents and start-ups, in addition to both national and international accolades.</p> */}
            </div>
        </>
    )
}

export default HeroSection
