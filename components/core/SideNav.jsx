import styles from "./SideNav.module.css";
import classNames from "classnames";
import Nav from "./Nav";
import Logo from "../icons/LogoDeeniTube";
import { menuOutline } from "../../icons";
import { IonIcon, IonRouterLink } from "@ionic/react";

const SideNav = ({ active, controller }) => {
  return (
    <div className={classNames(styles.wrapper, active ? styles.active : "")}>
      <div className={styles.nav}>
        <div className={styles.header}>
          <button className={styles.btn} onClick={controller}>
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
        <div className={styles.container}>
          <Nav />
        </div>
      </div>
      <div className={styles.backdrop} onClick={controller}></div>
    </div>
  );
};

export default SideNav;
