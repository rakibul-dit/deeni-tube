import styles from "./ChipBar.module.css";
import classNames from "classnames";
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
import { exploreOutline } from "../../icons";

const tags = [
  {
    title: "Explore",
    icon: exploreOutline,
    mobile: true,
  },
  {
    title: "All",
    active: true,
  },
  {
    title: "JavaScript",
  },
  {
    title: "User interface design",
  },
  {
    title: "Flutter",
  },
  {
    title: "React",
  },
  {
    title: "Node",
  },
  {
    title: "Python",
  },
  {
    title: "PHP",
  },
  {
    title: "Lectures",
  },
  {
    title: "Laravel",
  },
  {
    title: "Java",
  },
  {
    title: "Bodyweight exercise",
  },
  {
    title: "User interface design",
  },
  {
    title: "Flutter",
  },
  {
    title: "React",
  },
  {
    title: "Node",
  },
  {
    title: "Lectures",
  },
  {
    title: "Laravel",
  },
];

const ChipBar = () => {
  return (
    <div className={styles.content}>
      <ul className={styles.list}>
        {tags.map((t, i) => (
          <li
            key={i}
            className={classNames(
              styles.item,
              t.mobile ? styles.mobile : t.active ? styles.active : ""
            )}
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
