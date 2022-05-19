import React from "react";
import Slider from "react-slick";
import CardDetails from "./CardDetails/CardDetails";
import "./Carousel.css";

function Carousel({ title, content, type }) {
  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 6,
    slidesToScroll: 3,
    swipeToSlide: true,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 512,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          speed: 500,
        },
      },
    ],
  };
  return (
    <div
      className="main"
      style={{
        marginLeft: "10vw",
        marginRight: "10vw",
        paddingTop: "3rem",
        position: "relative",
      }}
    >
      <h2 style={{ marginBottom: "2rem" }}>{title}</h2>
      <Slider {...settings}>
        {content?.map((video) => (
          <CardDetails
            id={video.id}
            type={video.media_type ? video.media_type : type}
            key={video.id}
            carousel={true}
          />
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
