import * as React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Modal.module.css";

export default function MenuClickModal({ open, closer }) {
  return (
    <Modal
      open={open}
      onClose={closer}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 100,
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
