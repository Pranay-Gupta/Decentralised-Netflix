import React from "react";

import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Watchlist from "./pages/Watchlist";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/details/:type/:id" element={<Details />} />
      </Routes>
    </>
  );
};

export default App;
