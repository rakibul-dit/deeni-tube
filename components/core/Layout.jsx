import styles from "./Layout.module.css";
import classNames from "classnames";
import { UIStore, PopupStore } from "../../store";
import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Nav from "./Nav";
import MiniNav from "./MiniNav";
import BottomNav from "./BottomNav";
import { IonContent } from "@ionic/react";

const Layout = ({ children, page }) => {
  const isMini = UIStore.useState((s) => s.isMiniNav);

  // mobile header scroll effect
  const wrapper = useRef(null);
  const container = useRef(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  // const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    const instance = container.current;
    const setScroll = () => {
      setScrollTop(instance.scrollTop);
    };
    instance.addEventListener("scroll", setScroll);
    return () => {
      instance.removeEventListener("scroll", setScroll);
    };
  }, []);

  // disable scroll but keep scrollbar visible
  const popupOpen = PopupStore.useState((s) => s.open);

  useEffect(() => {
    const instance = container.current; // declare first otherwise remove listener throw error
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
    if (popupOpen) {
      instance.addEventListener("wheel", preventScroll);
    }
    return () => {
      instance.removeEventListener("wheel", preventScroll);
    };
  }, [popupOpen]);

  useEffect(() => {
    if (scrollTop > lastScrollTop) {
      wrapper.current.classList.remove("scroll_up");
      wrapper.current.classList.add("scroll_down");
    } else {
      wrapper.current.classList.remove("scroll_down");
      wrapper.current.classList.add("scroll_up");
    }
    setLastScrollTop(scrollTop);
  }, [scrollTop]);

  return (
    <IonContent>
      <div className={classNames(styles.wrapper, styles[page])} ref={wrapper}>
        <div className={classNames(styles.topbar, "header")}>
          <Header />
        </div>

        <div className={classNames(styles.sidebar, isMini ? styles.hide : "")}>
          <Nav />
        </div>

        <div
          className={classNames(
            styles.sidebar,
            styles.mini,
            isMini ? "" : styles.hide
          )}
        >
          <MiniNav />
        </div>

        <div className={styles.bottombar}>
          <BottomNav />
        </div>

        <div
          className={classNames(styles.container, isMini ? styles.mini : "")}
          ref={container}
        >
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </IonContent>
  );
};

export default Layout;
