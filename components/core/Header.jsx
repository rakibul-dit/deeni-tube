import styles from "./Header.module.css";
import classNames from "classnames";
import { UIStore } from "../../store";
import { toggleMiniNav } from "../../store";
import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../icons/LogoDeeniTube";

import {
  menuOutline,
  notificationOutline,
  searchOutline,
  appsOutline,
  close,
} from "../../icons";

import { IonIcon, IonRouterLink } from "@ionic/react";

const Header = ({ layout, controller }) => {
  const isMiniNav = UIStore.useState((s) => s.isMiniNav);
  const handleSidenav = () => {
    toggleMiniNav(!isMiniNav);
  };

  const history = useHistory();
  const inputWrapper = useRef(null);
  const inputRef = useRef(null);
  const hiddenIcon = useRef(null);
  const closeIcon = useRef(null);

  const [key, setKey] = useState("");

  const handleFocusIn = () => {
    inputWrapper.current.classList.add(styles.focus);
    hiddenIcon.current.classList.remove(styles.hide);
  };

  const handleFocusOut = () => {
    inputWrapper.current.classList.remove(styles.focus);
    hiddenIcon.current.classList.add(styles.hide);
  };

  const handleChange = (e) => {
    setKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key == "") {
      return false;
    }
    const href = "/search?key=" + key;
    history.replace(href);
  };

  const handleClear = () => {
    setKey("");
  };

  useEffect(() => {
    if (key === "") {
      closeIcon.current.classList.remove(styles.show);
      console.log("key");
    } else {
      closeIcon.current.classList.add(styles.show);
      console.log(key);
    }
  }, [key]);

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
          <form
            className={styles.search}
            action=""
            method="GET"
            onSubmit={handleSubmit}
          >
            <div className={styles.input} ref={inputWrapper}>
              <IonIcon
                icon={searchOutline} //
                slot="start"
                className={classNames(styles.s_hidden_icon, styles.hide)}
                ref={hiddenIcon}
              />
              <input
                type="text"
                name="search"
                placeholder="Search"
                ref={inputRef}
                onChange={handleChange}
                onFocus={handleFocusIn}
                onBlur={handleFocusOut}
                value={key}
              />
              <IonIcon
                icon={close} //
                slot="start"
                className={classNames(styles.s_close_icon)}
                ref={closeIcon}
                onClick={handleClear}
              />
            </div>

            <button className={styles.s_submit} type="submit">
              <IonIcon
                icon={searchOutline} //
                slot="start"
                className={styles.s_icon}
              />
            </button>
          </form>
        </div>

        <div className={styles.end}>
          <button className={classNames(styles.btn, styles.show_on_mobile)}>
            <IonIcon
              icon={searchOutline} //
              slot="start"
              className={styles.icon}
            />
          </button>
          <button className={classNames(styles.btn, styles.show_on_web)}>
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
