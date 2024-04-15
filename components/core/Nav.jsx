import styles from "./Nav.module.css";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { IonIcon, IonLabel, IonRouterLink } from "@ionic/react";

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
  watch,
  watchOutline,
  like,
  likeOutline,
  settingsOutline,
} from "../../icons";
import MenuClickModal from "../pages/modal/MenuClickModal";

const pages1 = [
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
];

const pages2 = [
  {
    title: "Library",
    icon: library,
    iconOutline: libraryOutline,
    url: "/library",
  },
  {
    title: "History",
    icon: history,
    iconOutline: historyOutline,
    url: "/history",
  },
  {
    title: "Watch later",
    icon: watch,
    iconOutline: watchOutline,
    url: "/watch-later",
  },
  {
    title: "Liked videos",
    icon: like,
    iconOutline: likeOutline,
    url: "/liked-videos",
  },
];

const pages3 = [
  {
    title: "Settings",
    icon: settingsOutline,
    iconOutline: settingsOutline,
    url: "/settings",
  },
  {
    title: "Library",
    icon: library,
    iconOutline: libraryOutline,
    url: "/library",
  },
  {
    title: "Subscriptions",
    icon: subscription,
    iconOutline: subscriptionOutline,
    url: "/subscriptions",
  },
];

const Nav = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <MenuList pages={pages1} openModal={openModal} />
          <hr className={styles.divider} />

          <MenuList pages={pages2} openModal={openModal} />
          <hr className={styles.divider} />

          <MenuList pages={pages3} openModal={openModal} />
          <hr className={styles.divider} />

          <div className={styles.title}>More from youtube</div>

          <MenuList pages={pages2} openModal={openModal} />
          <hr className={styles.divider} />
        </div>
        <div className={styles.footer}>
          {/* <div className={styles.links}>
              <a href="#">About</a>
              <a href="#">Press</a>
              <a href="#">Contact us</a>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
            </div> */}
          {/* <div className={styles.links}>
              <a href="#">About</a>
              <a href="#">Press</a>
              <a href="#">Contact us</a>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
            </div> */}
          <p className={styles.copyright}>
            &copy; 2022{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="http://deeniinfotech.com/"
            >
              Deeni Info Tech
            </a>
          </p>
        </div>
      </div>
      <MenuClickModal open={modalOpen} closer={handleModalClose} />
    </>
  );
};

const MenuList = ({ pages, openModal }) => {
  const location = useLocation();
  const [path, setPath] = useState("/");

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <div className={styles.list}>
      {pages.map((p, i) => (
        // <IonRouterLink
        //   routerLink={p.url}
        //   routerDirection="none"
        //   detail={false}
        //   lines="none"
        //   key={i}
        // >
        <div
          key={i}
          className={classNames(
            styles.item,
            p.url === path ? styles.active : ""
          )}
          onClick={openModal}
        >
          <IonIcon
            icon={p.url === path ? p.icon : p.iconOutline}
            slot="start"
            className={styles.icon}
          />
          <IonLabel className={styles.label}>{p.title}</IonLabel>
        </div>
        // </IonRouterLink>
      ))}
    </div>
  );
};

export default Nav;
