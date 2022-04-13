import { Rating, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { Button, useNotification } from "web3uikit";
import { getTrailerID } from "../../Api";
import ModalYT from "../ModalYT/ModalYT";
import "./DetailedBanner.css";
function DetailedBanner({ id, type, content }) {
  const shortDetails = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  const isMobile = useMediaQuery("(max-width:600px)");
  const imageUrl = `https://image.tmdb.org/t/p/original/${content?.poster_path}`;
  const [open, setOpen] = useState(false);
  const [trailerId, setTrailerId] = useState();
  useEffect(() => {
    getTrailerID(id, type).then((data) => {
      setTrailerId(data);
    });
  }, [id, type]);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, Moralis, account } = useMoralis();

  const dispatch = useNotification();

  const handleNewNotification = () => {
    dispatch({
      type: "error",
      message: "Please Connect Your Crypto Wallet",
      title: "Not Authenticated",
      position: "topL",
    });
  };
  const handleAddNotification = () => {
    dispatch({
      type: "success",
      message: "Movie added to list",
      title: "Success",
      position: "topL",
    });
  };
  const currentVideo = { id, type };
  const addToWatchlist = async () => {
    setIsLoading(true);
    await Moralis.Cloud.run("updateMyList", {
      addrs: account,
      newFav: currentVideo,
    });
    handleAddNotification();
    setIsLoading(false);
  };
  return (
    <>
      <div
        className="banner_img"
        style={{
          background: `url(${imageUrl}) center center/cover no-repeat`,
          marginTop: "7vh",
          height: "55vh",
          width: "100%",
          zIndex: 0,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <img className="image" src={imageUrl} alt="" />
        <div className="details">
          <h1 className="details_heading">{content.title || content.name}</h1>
          <div style={{ display: "flex" }}>
            {content.vote_average !== 0 && (
              <Rating
                name="read-only"
                sx={{ outlineColor: "yellow" }}
                value={content.vote_average / 2}
                precision={0.5}
                readOnly
              />
            )}
            {content.vote_count !== 0 && (
              <p className="details_body">({content.vote_count})</p>
            )}
          </div>
          <div className="content_details">
            {content.vote_average !== 0 && (
              <p className="details_body">IMDB {content.vote_average}</p>
            )}
            {content.runtime && (
              <p className="details_body" style={{ marginLeft: "1rem" }}>
                {Math.floor(content.runtime / 60)}h {content.runtime % 60}m
              </p>
            )}

            {content.genres?.map((g, i) => (
              <p
                key={i}
                className="details_body"
                style={{ marginLeft: "1rem" }}
              >
                {g.name}
              </p>
            ))}
          </div>

          <h5 className="details_heading" style={{ marginBottom: "1rem" }}>
            <em>{content.tagline}</em>
          </h5>
          {isMobile ? (
            <p className="details_body">
              {shortDetails(content?.overview, 150)}
            </p>
          ) : (
            <p className="details_body">
              {shortDetails(content?.overview, 350)}
            </p>
          )}
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
            {!isAuthenticated ? (
              <>
                <div style={{ marginLeft: "15px" }}>
                  <Button
                    isTransparent={true}
                    icon="plus"
                    onClick={handleNewNotification}
                    text="Add to Watchlist"
                    theme="outline"
                    type="button"
                  />
                </div>
              </>
            ) : (
              <div style={{ marginLeft: "15px" }}>
                <Button
                  isTransparent={true}
                  disabled={isLoading}
                  icon="plus"
                  onClick={addToWatchlist}
                  text="Add to Watchlist"
                  theme="outline"
                  type="button"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalYT open={open} setOpen={setOpen} trailerId={trailerId} />
    </>
  );
}

export default DetailedBanner;
