import React, { useEffect, useState } from "react";
import { getTopRated } from "../Api/index";
import Carousel from "./Carousel";

function Series() {
  const [topTv, setTopTv] = useState([]);
  useEffect(() => {
    getTopRated("tv", 1).then((data) => {
      setTopTv(data?.results);
    });
  }, []);

  return (
    <div>
      <Carousel title="Top Series" content={topTv} type="tv" />
    </div>
  );
}

export default Series;
