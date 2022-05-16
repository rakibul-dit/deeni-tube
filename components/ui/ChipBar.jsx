import styles from "./ChipBar.module.css";
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
import { list } from "ionicons/icons";

const tags = [
  {
    title: "Explore",
    icon: list,
    url: "/explore",
  },
  {
    title: "All",
    url: "/",
  },
  {
    title: "JavaScript",
    url: "/",
  },
  {
    title: "Website",
    url: "/",
  },
  {
    title: "Flutter",
    url: "/",
  },
  {
    title: "React",
    url: "/",
  },
  {
    title: "Node",
    url: "/",
  },
  {
    title: "Python",
    url: "/",
  },
  {
    title: "PHP",
    url: "/",
  },
  {
    title: "Lectures",
    url: "/",
  },
  {
    title: "Laravel",
    url: "/",
  },
];

const ChipBar = () => {
  return (
    <div className={styles.content}>
      <ul className={styles.list}>
        {tags.map((t, i) => (
          <li
            // routerLink={t.url}
            // routerDirection="none"
            // detail={false}
            // lines="none"
            key={i}
            className={styles.item}
          >
            {t.icon && (
              <IonIcon icon={t.icon} slot="start" className={styles.icon} />
            )}
            <IonLabel className={styles.label}>{t.title}</IonLabel>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChipBar;
