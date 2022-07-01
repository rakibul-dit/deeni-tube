import styles from "./MiniPlayer.module.css";
import classNames from "classnames";
import { MiniPlayerStore, setMiniPlayerActive } from "../../store";
import { expand } from "../../icons";
import { IonIcon } from "@ionic/react";

const MiniPlayer = () => {
  const isActive = MiniPlayerStore.useState((s) => s.isActive);
  const src = MiniPlayerStore.useState((s) => s.src);
  const title = MiniPlayerStore.useState((s) => s.title);
  const subTitle = MiniPlayerStore.useState((s) => s.subTitle);

  return (
    <div className={classNames(styles.wrapper, isActive ? styles.active : "")}>
      <div className={styles.content}>
        <div className={styles.player}>
          <iframe
            frameBorder="0"
            // allowFullScreen="1"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; fullscreen; picture-in-picture"
            // title={title}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${src}?autoplay=1&mute=1&enablejsapi=1`}
          ></iframe>
        </div>
        <div className={styles.title_area}>
          <h2>{title}</h2>
          <h3>{subTitle}</h3>
        </div>
      </div>
      <button
        className={styles.close} //
        onClick={() => setMiniPlayerActive(false)}
      >
        <IonIcon
          icon={expand} //
          slot="start"
          className={styles.icon}
        />
      </button>
    </div>
  );
};

export default MiniPlayer;
