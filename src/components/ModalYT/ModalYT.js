import React from "react";
import ReactPlayer from "react-player";
import { Modal } from "web3uikit";
import "./ModalYT.css";
function ModalYT({ open, setOpen, trailerId }) {
  return (
    <>
      {open && (
        <div
          className="modal_div"
          style={{
            height: "90vh",
            transform: "scale(1)",
            zIndex: 100,

            ...(!open && {
              display: "none",
            }),
          }}
        >
          <Modal hasFooter={false} onCloseButtonPressed={() => setOpen(false)}>
            <div style={{ height: "60vh" }} className="modal_player">
              <ReactPlayer
                controls
                width="100%"
                height="100%"
                url={`https://www.youtube.com/watch?v=${trailerId}`}
              />
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}

export default ModalYT;
