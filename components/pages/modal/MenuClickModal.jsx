import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Modal.module.css";

export default function MenuClickModal({ open, closer }) {
  return (
    <Modal
      open={open}
      onClose={closer}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 100,
        },
      }}
    >
      <Fade in={open} timeout={100} style={{ transitionDelay: "0ms" }}>
        <div className={styles.menuModal}>
          <span className={styles.menuClose} onClick={closer}>
            <CloseIcon />
          </span>
          <p className={styles.title}>In progess. Coming soon...</p>
        </div>
      </Fade>
    </Modal>
  );
}
