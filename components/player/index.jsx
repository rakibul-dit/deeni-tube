import classNames from "classnames";
import { IonIcon, IonRouterLink } from "@ionic/react";
import { MiniPlayerStore, setMiniPlayerActive } from "../../store";
import { expand, mini } from "../../icons";
import styles from "./index.module.css";

const Player = () => {
  const isActive = MiniPlayerStore.useState((s) => s.isActive);
  const src = MiniPlayerStore.useState((s) => s.src);
  const title = MiniPlayerStore.useState((s) => s.title);
  const subTitle = MiniPlayerStore.useState((s) => s.subTitle);

  return (
    <div className={classNames(styles.wrapper, isActive ? styles.active : "")}>
      <div className={styles.content}>
        <div className={styles.player}>
          <div className={styles.player_outer}>
            <div className={styles.player_inner}>
              <div className={styles.player_container}>
                <iframe
                  frameBorder="0"
                  // allowFullScreen="1"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; fullscreen; picture-in-picture"
                  // title={title}
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${src}?modestbranding=1&showinfo=0&autoplay=1&mute=0&enablejsapi=1&showsearch=0&rel=0&iv_load_policy=3&autohide=1`}
                ></iframe>

                {isActive && (
                  <IonRouterLink
                    routerLink={`/watch/${src}`}
                    className={styles.mini_btn}
                    onClick={() => setMiniPlayerActive(false)}
                  >
                    <IonIcon
                      icon={expand} //
                      slot="start"
                      className={styles.mini_icon}
                    />
                  </IonRouterLink>
                )}
                {!isActive && (
                  <IonRouterLink
                    routerLink={"/"}
                    className={styles.mini_btn}
                    onClick={() => setMiniPlayerActive(true)}
                  >
                    <IonIcon
                      icon={mini} //
                      slot="start"
                      className={styles.mini_icon}
                    />
                  </IonRouterLink>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.title_area}>
          <h2>{title}</h2>
          <h3>{subTitle}</h3>
        </div>
      </div>
    </div>
  );
};

export default Player;
