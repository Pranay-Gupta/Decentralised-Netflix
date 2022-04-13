import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "web3uikit";
import { getDetails } from "../../Api";
import ModalYT from "../ModalYT/ModalYT";
import "./CardDetails.css";
function CardDetails({ id, type }) {
  const [content, setContent] = useState([]);
  useEffect(() => {
    getDetails(id, type).then((data) => {
      setContent(data);
    });
  }, [id, type]);
  const [visible, setVisible] = useState(true);
  const imageUrl = `https://image.tmdb.org/t/p/original/${content.poster_path}`;

  const navigate = useNavigate();
  const loadDetails = () => {
    navigate(`/details/${type}/${id}`);
  };

  return (
    <>
      <div className="main" onClick={loadDetails}>
        <div className="card">
          <img src={imageUrl} alt="" />
        </div>
        <p className="title">{content.name || content.title}</p>
      </div>
    </>
  );
}

export default CardDetails;
