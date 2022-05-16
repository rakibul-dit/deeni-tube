import styles from "./BottomNav.module.css";
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
import { cog, flash, homeOutline, list } from "ionicons/icons";

const pages = [
  {
    title: "Home",
    icon: homeOutline,
    url: "/",
  },
  {
    title: "Lists",
    icon: list,
    url: "/",
  },
  {
    title: "Feed",
    icon: flash,
    url: "/",
  },
  {
    title: "Settings",
    icon: cog,
    url: "/",
  },
];

const BottomNav = () => {
  return (
    <IonContent className={styles.content}>
      <IonList lines="inset" className={styles.list}>
        {pages.map((p, k) => (
          <IonItem
            routerLink={p.url}
            routerDirection="none"
            detail={false}
            lines="none"
            key={k}
            className={styles.item}
          >
            <IonIcon icon={p.icon} slot="start" />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

export default BottomNav;
