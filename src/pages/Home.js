import React from "react";
import Banner from "../components/Banner/Banner";
import Movies from "../components/Movies";
import Series from "../components/Series";
import Trending from "../components/Trending";
import UpComing from "../components/UpComing";

const Home = () => {
  return (
    <div>
      <Banner />
      <div style={{ marginTop: "55vh" }}>
        <Trending />
        <Movies />
        <Series />

        <UpComing />
      </div>
    </div>
  );
};

export default Home;
