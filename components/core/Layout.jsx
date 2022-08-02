import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { IonContent, IonPage } from "@ionic/react";
import classNames from "classnames";
import { UIStore, PopupStore } from "../../store";
import Header from "./Header";
import Nav from "./Nav";
import MiniNav from "./MiniNav";
import BottomNav from "./BottomNav";
import Player from "../player";
import Popup from "../utils/PopupPrimary";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const isMini = UIStore.useState((s) => s.isMiniNav);
  const wrapper = useRef(null);
  const container = useRef(null);

  const location = useLocation();
  const [path, setPath] = useState("/");
  const [type, setType] = useState("type1");

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  useEffect(() => {
    if (path === "/") {
      setType("type1");
      wrapper.current.classList.add(styles.type1);
    } else {
      setType("type2");
      wrapper.current.classList.add(styles.type2);
    }
    console.log(type);
  }, [path]);

  // mobile header scroll effect

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
    <IonPage>
      <Popup />
      <div className={classNames(styles.wrapper, styles[type])} ref={wrapper}>
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
          <div className={styles.content}>
            <div className={styles.primary}>
              <div className={styles.player}>
                <Player />
              </div>
              <div className={styles.page}>{children}</div>
            </div>

            <div className={styles.secondary}>
              {/* <div className={styles.secondary_inner}>
                <h3 className={styles.more_item}>Up next</h3>
                <div className={styles.related_container}>
                  {data.videos.map((video, index) => (
                    <div className={styles.related_item} key={index}>
                      <VideoCard
                        {...video}
                        statistics={data.videoStats}
                        channelThumbnails={data.channels}
                      />
                    </div>
                  ))}

                  <div ref={ref} className={styles.loader}>
                    {isLoadingMore && <Loader />}
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </IonPage>
  );
};

export default Layout;
