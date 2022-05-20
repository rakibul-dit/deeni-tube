import styles from "./Layout.module.css";
import classNames from "classnames";
import { UIStore } from "../../store";
import Header from "./Header";
import Nav from "./Nav";
import MiniNav from "./MiniNav";
import BottomNav from "./BottomNav";

const Layout = ({ children }) => {
  const isMini = UIStore.useState((s) => s.isMiniNav);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topbar}>
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

      <div className={classNames(styles.container, isMini ? styles.mini : "")}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
