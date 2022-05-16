import styles from "./Layout.module.css";
import { UIStore } from "../../store";
import Header from "./Header";
import Nav from "./Nav";
import MiniNav from "./MiniNav";
import BottomNav from "./BottomNav";

const Layout = ({ children }) => {
  const isMiniNav = UIStore.useState((s) => s.isMiniNav);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.topbar}>
          <Header />
        </div>
        <div
          className={
            isMiniNav ? `${styles.container} ${styles.mini}` : styles.container
          }
        >
          <div className={styles.sidebar}>
            {isMiniNav && <MiniNav />}
            {!isMiniNav && <Nav />}
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>

      <div className={styles.bottombar}>
        <BottomNav />
      </div>
    </>
  );
};

export default Layout;
