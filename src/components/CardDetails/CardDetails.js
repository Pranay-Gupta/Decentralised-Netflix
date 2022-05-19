import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDetails } from "../../Api";
import "./CardDetails.css";
function CardDetails({ id, type, carousel }) {
  const [content, setContent] = useState([]);
  useEffect(() => {
    getDetails(id, type).then((data) => {
      setContent(data);
    });
  }, [id, type]);

  const imageUrl = `https://image.tmdb.org/t/p/original/${content.poster_path}`;

  const navigate = useNavigate();
  const loadDetails = () => {
    navigate(`/details/${type}/${id}`);
  };

  return (
    <>
      {carousel ? (
        <Tooltip title={content.name || content.title} arrow>
          <div
            className="main"
            onClick={loadDetails}
            sx={{ position: "relative" }}
          >
            <div className="card">
              <img src={imageUrl} alt="" style={{ objectFit: "cover" }} />
            </div>
            {/* <p className="title" sx={{ position: "absolute", top: 0 }}>
     {content.name || content.title}
   </p> */}
          </div>
        </Tooltip>
      ) : (
        <div
          className="main"
          onClick={loadDetails}
          sx={{ position: "relative" }}
        >
          <div className="card">
            <img src={imageUrl} alt="" style={{ objectFit: "cover" }} />
          </div>
          <p className="title" sx={{ position: "absolute", top: 0 }}>
            {content.name || content.title}
          </p>
        </div>
      )}
    </>
  );
}

export default CardDetails;
