import styles from "./Layout2.module.css";
import classNames from "classnames";
// import { UIStore } from "../../store";
import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import SideNav from "./SideNav";
// import MiniNav from "./MiniNav";
// import BottomNav from "./BottomNav";
import { IonContent } from "@ionic/react";

const Layout = ({ children }) => {
  // const isMini = UIStore.useState((s) => s.isMiniNav);

  // mobile header scroll effect
  const wrapper = useRef(null);
  const container = useRef(null);
  // const [lastScrollTop, setLastScrollTop] = useState(0);
  // const [scrollTop, setScrollTop] = useState(0);
  // const [didMount, setDidMount] = useState(false);

  // useEffect(() => {
  //   setDidMount(true);

  //   container.current.onscroll = () => {
  //     setScrollTop(container.current.scrollTop);
  //   };

  //   if (scrollTop > lastScrollTop) {
  //     wrapper.current.classList.remove("scroll_up");
  //     wrapper.current.classList.add("scroll_down");
  //   } else {
  //     wrapper.current.classList.remove("scroll_down");
  //     wrapper.current.classList.add("scroll_up");
  //   }

  //   setLastScrollTop(scrollTop);

  //   return () => setDidMount(false);
  // }, [scrollTop]);

  const [sidenavActive, setSidenavActive] = useState(false);

  const handleSidenav = (active) => {
    setSidenavActive(active);
  };

  return (
    <IonContent>
      <div className={styles.wrapper} ref={wrapper}>
        <div className={styles.topbar}>
          <Header layout="layout2" controller={() => handleSidenav(true)} />
        </div>

        <div className={styles.sidebar}>
          <SideNav
            active={sidenavActive}
            controller={() => handleSidenav(false)}
          />
        </div>

        {/* <div className={styles.bottombar}>
        <BottomNav />
      </div> */}

        <div className={styles.container} ref={container}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </IonContent>
  );
};

export default Layout;
