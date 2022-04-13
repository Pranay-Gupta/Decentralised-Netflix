import React, { useEffect, useState } from "react";
import { getTrending } from "../Api";
import Carousel from "./Carousel";

const Trending = () => {
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    getTrending(Math.floor(Math.random() * 10 + 1)).then((data) => {
      setTrending(data?.results);
    });
  }, []);
  return (
    <div>
      <Carousel title="Trending" content={trending} />
    </div>
  );
};

export default Trending;
