import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "web3uikit";
import { getTrailerID, getTrending } from "../../Api";
import ModalYT from "../ModalYT/ModalYT";
import "./Banner.css";

function Banner() {
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getTrending(Math.floor(Math.random() * 10 + 1)).then((data) => {
      setContent(
        data.results[Math.floor(Math.random() * data.results.length - 1)]
      );
    });
  }, []);

  const shortDetails = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  const navigate = useNavigate();
  const loadDetails = () => {
    navigate(`/details/${content.media_type}/${content.id}`);
  };
  const [trailerId, setTrailerId] = useState();
  useEffect(() => {
    getTrailerID(content.id, content.media_type).then((data) => {
      setTrailerId(data);
    });
  });
  return (
    <>
      <div
        className="banner_img"
        style={{
          background: `url(https://image.tmdb.org/t/p/original/${content.poster_path}) center center/cover no-repeat`,
          marginTop: "7vh",
          height: "55vh",
          width: "100%",
          zIndex: 0,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <div className="banner_details">
          <h1>{content.title || content.name}</h1>
          <p>{shortDetails(content?.overview, 350)}</p>
          <div className="banner_button">
            <Button
              color="red"
              icon="chevronRightX2"
              isTransparent={true}
              onClick={() => setOpen(true)}
              text="Play"
              theme="colored"
              type="button"
            />

            <div style={{ marginLeft: "15px" }}>
              <Button
                isTransparent={true}
                onClick={loadDetails}
                text="Details"
                theme="outline"
                type="button"
              />
            </div>
          </div>
        </div>
      </div>
      <ModalYT open={open} setOpen={setOpen} trailerId={trailerId} />
    </>
  );
}

export default Banner;
