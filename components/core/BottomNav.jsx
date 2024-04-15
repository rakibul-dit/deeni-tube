import styles from "./BottomNav.module.css";
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
  ellipsisHorizontal,
} from "../../icons";
import MenuClickModal from "../pages/modal/MenuClickModal";

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
    title: "Subscriptions",
    icon: subscription,
    iconOutline: subscriptionOutline,
    url: "/subscriptions",
  },
  {
    title: "More",
    icon: ellipsisHorizontal,
    iconOutline: ellipsisHorizontal,
    url: "/more",
  },
];

const BottomNav = () => {
  const location = useLocation();
  const [path, setPath] = useState("/");

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className={styles.wrapper}>
      <IonList className={styles.list}>
        {pages.map((p, i) => (
          <div
            // routerLink={p.url}
            key={i}
            className={styles.item}
            onClick={openModal}
          >
            <div className={styles.inner}>
              <IonIcon
                icon={p.url === path ? p.icon : p.iconOutline}
                slot="start"
                className={styles.icon}
              />
              <IonLabel className={styles.label}>{p.title}</IonLabel>
            </div>
          </div>
        ))}
      </IonList>
      <MenuClickModal open={modalOpen} closer={handleModalClose} />
    </div>
  );
};

export default BottomNav;
