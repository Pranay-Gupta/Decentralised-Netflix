import React, { useEffect, useState } from "react";
import { getUpComing } from "../Api";
import Carousel from "./Carousel";

function UpComing() {
  const [upComing, setUpComing] = useState([]);

  useEffect(() => {
    getUpComing(1).then((data) => {
      setUpComing(data?.results);
    });
  }, []);
  return (
    <div>
      <Carousel title="Upcoming Movies" content={upComing} type="movie" />
    </div>
  );
}

export default UpComing;
