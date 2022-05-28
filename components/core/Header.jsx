import styles from "./Header.module.css";
import classNames from "classnames";
import { UIStore } from "../../store";
import { toggleMiniNav } from "../../store";
import Logo from "../icons/LogoDeeniTube";

import {
  menuOutline,
  notificationOutline,
  searchOutline,
  appsOutline,
} from "../../icons";

import { IonIcon, IonRouterLink } from "@ionic/react";

const Header = ({ layout, controller }) => {
  const isMiniNav = UIStore.useState((s) => s.isMiniNav);
  const handleSidenav = () => {
    toggleMiniNav(!isMiniNav);
  };

  return (
    <div className={classNames(styles.wrapper, styles[layout])}>
      <div className={styles.container}>
        <div className={styles.start}>
          <button
            className={classNames(styles.btn, styles.menu_btn)}
            onClick={controller ? controller : handleSidenav}
          >
            <IonIcon
              icon={menuOutline} //
              slot="start"
              className={styles.icon}
            />
          </button>
          <IonRouterLink routerLink="/">
            <div className={styles.logo}>
              <Logo />
            </div>
          </IonRouterLink>
        </div>

        <div className={styles.center}>
          <div className={styles.search}>
            <input type="text" name="search" placeholder="Search" />
          </div>
        </div>

        <div className={styles.end}>
          <button className={styles.btn}>
            <IonIcon
              icon={notificationOutline} //
              slot="start"
              className={styles.icon}
            />
          </button>
          <button className={styles.btn}>
            <IonIcon
              icon={appsOutline} //
              slot="start"
              className={styles.icon}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
