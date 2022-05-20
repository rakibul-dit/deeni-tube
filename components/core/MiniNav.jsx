import styles from "./MiniNav.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { IonIcon, IonRouterLink, IonLabel, IonList } from "@ionic/react";

import {
  home,
  homeOutline,
  explore,
  exploreOutline,
  subscription,
  subscriptionOutline,
  library,
  libraryOutline,
  history,
  historyOutline,
} from "../../icons";

const pages = [
  {
    title: "Home",
    icon: home,
    iconOutline: homeOutline,
    url: "/",
  },
  {
    title: "Explore",
    icon: explore,
    iconOutline: exploreOutline,
    url: "/explore",
  },
  {
    title: "History",
    icon: history,
    iconOutline: historyOutline,
    url: "/history",
  },
  {
    title: "Subscriptions",
    icon: subscription,
    iconOutline: subscriptionOutline,
    url: "/subscriptions",
  },
  {
    title: "Library",
    icon: library,
    iconOutline: libraryOutline,
    url: "/library",
  },
];

const MiniNav = () => {
  const location = useLocation();
  const [path, setPath] = useState("/");

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <div className={styles.wrapper}>
      <IonList className={styles.list}>
        {pages.map((p, i) => (
          <IonRouterLink //
            routerLink={p.url}
            key={i}
          >
            <div className={styles.item}>
              <IonIcon
                icon={p.url === path ? p.icon : p.iconOutline}
                slot="start"
                className={styles.icon}
              />
              <IonLabel className={styles.label}>{p.title}</IonLabel>
            </div>
          </IonRouterLink>
        ))}
      </IonList>
    </div>
  );
};

export default MiniNav;
