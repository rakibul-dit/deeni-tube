import styles from "./Header.module.css";
import classNames from "classnames";
import { UIStore } from "../../store";
import { toggleMiniNav } from "../../store";
import { IonButton } from "@ionic/react";
import MenuIcon from "../icons/Menu";
import Logo from "../icons/LogoDeeniTube";
import NotificationIcon from "../icons/Notification";

const Header = () => {
  const isMiniNav = UIStore.useState((s) => s.isMiniNav);
  const handleSidenav = () => {
    toggleMiniNav(!isMiniNav);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.start}>
          <button
            className={classNames("", styles.btn, styles.menu_btn)}
            onClick={handleSidenav}
          >
            <MenuIcon />
          </button>
          <div className={styles.logo}>
            <Logo />
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.search}>
            <input type="text" name="search" placeholder="Search" />
          </div>
        </div>
        <div className={styles.end}>
          <button className={classNames(styles.btn)}>
            <NotificationIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
