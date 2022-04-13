import React, { useEffect, useState } from "react";
import { getTopRated } from "../Api";
import Carousel from "./Carousel";

function Movies() {
  const [topMovie, setTopMovie] = useState([]);
  useEffect(() => {
    getTopRated("movie", 1).then((data) => {
      setTopMovie(data?.results);
    });
  }, []);
  return (
    <div>
      <Carousel title="Top Movies" content={topMovie} type="movie" />
    </div>
  );
}

export default Movies;
