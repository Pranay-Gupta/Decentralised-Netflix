import React, { useState } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { ConnectButton, useNotification } from "web3uikit";
import { useMoralis } from "react-moralis";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useMediaQuery } from "@mui/material";
function Navbar() {
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);
  const home = location.pathname === "/";
  const movies = location.pathname === "/movies";
  const series = location.pathname === "/series";
  const search = location.pathname === "/search";
  const watchlist = location.pathname === "/watchlist";

  const isMobile = useMediaQuery("(max-width:1400px)");

  const { account } = useMoralis();

  const dispatch = useNotification();

  const handleNewNotification = () => {
    dispatch({
      type: "error",
      message: "Please connect to your crypto wallet to access watchlist",
      title: "Not Authenticated",
      position: "topL",
    });
  };
  return (
    <>
      <div className="navbar_main">
        <IconButton
          sx={{
            ml: 1,
            visibility: "hidden",
            ...(isMobile && {
              visibility: "visible",
            }),
          }}
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? (
            <CloseOutlinedIcon sx={{ color: "white" }} />
          ) : (
            <MenuIcon sx={{ color: "white" }} />
          )}
        </IconButton>
        <img
          src="https://imgs.search.brave.com/ADmJR82u19vtwU9qDUIt64x3yPOnMsUhaN6PDo_YZRs/rs:fit:1200:1200:1/g:ce/aHR0cDovLzEwMDBs/b2dvcy5uZXQvd3At/Y29udGVudC91cGxv/YWRzLzIwMTcvMDUv/TmV0ZmxpeC1Mb2dv/LnBuZw"
          alt=""
        />
        {!isMobile && (
          <div className="navbar_menu">
            <ul>
              <Link className={`${home ? "current" : "navbar_link"}`} to="/">
                Home
              </Link>
              <Link
                className={`${movies ? "current" : "navbar_link"}`}
                to="/movies"
              >
                Movies
              </Link>
              <Link
                className={`${series ? "current" : "navbar_link"}`}
                to="/series"
              >
                Series
              </Link>
              <Link
                className={`${search ? "current" : "navbar_link"}`}
                to="/search"
              >
                Search
              </Link>
              {account ? (
                <Link
                  className={`${watchlist ? "current" : "navbar_link"}`}
                  to="/watchlist"
                >
                  Watchlist
                </Link>
              ) : (
                <Link
                  onClick={handleNewNotification}
                  className={`${watchlist ? "current" : "navbar_link"}`}
                  to="#"
                >
                  Watchlist
                </Link>
              )}
            </ul>
          </div>
        )}

        <div className="navbar_login ">
          <ConnectButton />
        </div>
      </div>
      {mobileMenu && (
        <div className="mobile_menu">
          <Link
            className={`${home ? "mobile_current" : "mobile_navbar_link"}`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`${movies ? "mobile_current" : "mobile_navbar_link"}`}
            to="/movies"
          >
            Movies
          </Link>
          <Link
            className={`${series ? "mobile_current" : "mobile_navbar_link"}`}
            to="/series"
          >
            Series
          </Link>
          <Link
            className={`${search ? "mobile_current" : "mobile_navbar_link"}`}
            to="/search"
          >
            Search
          </Link>
          {account ? (
            <Link
              className={`${
                watchlist ? "mobile_current" : "mobile_navbar_link"
              }`}
              to="/watchlist"
            >
              Watchlist
            </Link>
          ) : (
            <Link
              onClick={handleNewNotification}
              className={`${
                watchlist ? "mobile_current" : "mobile_navbar_link"
              }`}
              to="#"
            >
              Watchlist
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
