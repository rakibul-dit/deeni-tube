import styles from "./Nav.module.css";
import classNames from "classnames";
import { StatusBar, Style } from "@capacitor/status-bar";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { cog, flash, list } from "ionicons/icons";

const pages = [
  {
    title: "Home",
    icon: flash,
    url: "/",
  },
  {
    title: "Explore",
    icon: list,
    url: "/explore",
  },
  {
    title: "Shorts",
    icon: cog,
    url: "/shorts",
  },
  {
    title: "Subscriptions",
    icon: cog,
    url: "/shorts",
  },
];

const Nav = () => {
  return (
    <IonContent>
      <IonList>
        {pages.map((p, k) => (
          <IonItem
            routerLink={p.url}
            routerDirection="none"
            detail={false}
            lines="none"
            key={k}
            className={styles.item}
          >
            <IonIcon icon={p.icon} slot="start" className={styles.icon} />
            <IonLabel className={styles.label}>{p.title}</IonLabel>
          </IonItem>
        ))}
        {pages.map((p, k) => (
          <IonItem
            routerLink={p.url}
            routerDirection="none"
            detail={false}
            lines="none"
            key={k}
            className={styles.item}
          >
            <IonIcon icon={p.icon} slot="start" className={styles.icon} />
            <IonLabel className={styles.label}>{p.title}</IonLabel>
          </IonItem>
        ))}
        {pages.map((p, k) => (
          <IonItem
            routerLink={p.url}
            routerDirection="none"
            detail={false}
            lines="none"
            key={k}
            className={styles.item}
          >
            <IonIcon icon={p.icon} slot="start" className={styles.icon} />
            <IonLabel className={styles.label}>{p.title}</IonLabel>
          </IonItem>
        ))}
        {pages.map((p, k) => (
          <IonItem
            routerLink={p.url}
            routerDirection="none"
            detail={false}
            lines="none"
            key={k}
            className={styles.item}
          >
            <IonIcon icon={p.icon} slot="start" className={styles.icon} />
            <IonLabel className={styles.label}>{p.title}</IonLabel>
          </IonItem>
        ))}
        {pages.map((p, k) => (
          <IonItem
            routerLink={p.url}
            routerDirection="none"
            detail={false}
            lines="none"
            key={k}
            className={styles.item}
          >
            <IonIcon icon={p.icon} slot="start" className={styles.icon} />
            <IonLabel className={styles.label}>{p.title}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

export default Nav;
