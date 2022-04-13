import React from "react";
import AliceCarousel from "react-alice-carousel";
import CardDetails from "./CardDetails/CardDetails";
import "./Carousel.css";
function Carousel({ title, content, type }) {
  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 4,
    },
    1024: {
      items: 6,
    },
  };

  return (
    <>
      <div
        className="main"
        style={{
          marginLeft: "10vw",
          marginRight: "10vw",
          paddingTop: "3rem",
        }}
      >
        <h2 style={{ marginBottom: "2rem" }}>{title}</h2>
        <AliceCarousel
          mouseTracking
          infinite
          responsive={responsive}
          items={content?.map((video) => (
            <CardDetails
              id={video.id}
              type={video.media_type ? video.media_type : type}
              key={video.id}
            />
          ))}
          animationDuration={5000}
          autoPlay
          disableDotsControls
          keyboardNavigation={true}
          disableButtonsControls
        />
      </div>
    </>
  );
}

export default Carousel;
