import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import { MiniPlayerStore } from "../../../store";
import styles from "./Modal.module.css";

export default function PlayerModal({ open, closer, src, videoDetail }) {
  return (
    <Modal
      open={open}
      onClose={closer}
      className="player-modal"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open} timeout={100} style={{ transitionDelay: "0ms" }}>
        <div className={styles.modal}>
          <div className={styles.iframe_container}>
            <span className={styles.bigClose} onClick={closer}>
              <CloseIcon />
            </span>
            <iframe
              frameBorder="0"
              // allowFullScreen="1"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; fullscreen; picture-in-picture"
              // title={title}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${src}?modestbranding=1&showinfo=0&autoplay=1&mute=0&enablejsapi=1&showsearch=0&rel=0&iv_load_policy=3&autohide=1`}
            ></iframe>
          </div>

          <div className={styles.title_area}>
            <h2>{videoDetail.title}</h2>
            <span className={styles.close} onClick={closer}>
              <CloseIcon />
            </span>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
