import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetails, getRecommended } from "../Api";
import Carousel from "../components/Carousel";
import DetailedBanner from "../components/DetailedBanner.js/DetailedBanner";

function Details() {
  const { id, type } = useParams();
  const [content, setContent] = useState({});
  useEffect(() => {
    getDetails(id, type).then((data) => {
      setContent(data);
    });
  }, [id, type]);
  const [recommended, setRecommended] = useState([]);
  useEffect(() => {
    getRecommended(id, type, 1).then((data) => {
      setRecommended(data?.results);
    });
  }, [id, type]);

  return (
    <>
      <DetailedBanner id={id} type={type} content={content} />
      <div style={{ marginTop: "55vh" }}>
        {recommended.length !== 0 && (
          <Carousel
            title="Recommended"
            content={recommended}
            type={type}
            idFromDetails={id}
          />
        )}
      </div>
    </>
  );
}

export default Details;
