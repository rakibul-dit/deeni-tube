import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IonRouterLink } from "@ionic/react";
import classNames from "classnames";
import styles from "./Tabs.module.css";

const Tabs = ({ id }) => {
  const location = useLocation();
  const [path, setPath] = useState("home");

  useEffect(() => {
    setPath(location.pathname.split("/")[3]);
  }, [location]);

  return (
    <div className={styles.wrapper}>
      <IonRouterLink
        routerLink={`/channels/${id}/home`}
        className={classNames(
          styles.link,
          path === "home" ? styles.active : ""
        )}
      >
        <span className={styles.text}>Home</span>
      </IonRouterLink>
      <IonRouterLink
        routerLink={`/channels/${id}/videos`}
        className={classNames(
          styles.link,
          path === "videos" ? styles.active : ""
        )}
      >
        <span className={styles.text}>Videos</span>
      </IonRouterLink>
      <IonRouterLink
        routerLink={`/channels/${id}/playlists`}
        className={classNames(
          styles.link,
          path === "playlists" ? styles.active : ""
        )}
      >
        <span className={styles.text}>Playlists</span>
      </IonRouterLink>
      <IonRouterLink
        routerLink={`/channels/${id}/about`}
        className={classNames(
          styles.link,
          path === "about" ? styles.active : ""
        )}
      >
        <span className={styles.text}>About</span>
      </IonRouterLink>
    </div>
  );
};

export default Tabs;
