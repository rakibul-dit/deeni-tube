import styles from "./PopupPrimary.module.css";
import classNames from "classnames";
import { useState, useEffect, useRef } from "react";
import { PopupStore, setPopupOpen } from "../../store";
import { IonIcon, IonContent } from "@ionic/react";
import {
  queue,
  watchOutline,
  playlist,
  share,
  notInterested,
  notRecommend,
  report,
} from "../../icons";

const Popup = () => {
  const open = PopupStore.useState((s) => s.open);
  const reference = PopupStore.useState((s) => s.reference);
  const videoId = PopupStore.useState((s) => s.videoId);

  const [pos, setPos] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const [isOpen, setIsOpen] = useState(open);

  const popupRef = useRef(null);
  const mobilePopupContentRef = useRef(null);

  useEffect(() => {
    const refElem = reference.getBoundingClientRect();

    setPos({
      top:
        window.innerHeight - refElem.top > popupRef.current.offsetHeight
          ? refElem.top + 40
          : "auto",
      left:
        window.innerWidth - refElem.left > popupRef.current.offsetWidth
          ? refElem.left + 8
          : "auto",
      right:
        window.innerWidth - refElem.left > popupRef.current.offsetWidth
          ? "auto"
          : window.innerWidth - refElem.right - 8,
      bottom:
        window.innerHeight - refElem.top > popupRef.current.offsetHeight
          ? "auto"
          : window.innerHeight - refElem.bottom + 40,
    });

    setIsOpen(open);

    const addClickEventOnBody = () => {
      setPopupOpen(false);
    };

    const addClickEventOnPopup = (e) => {
      e.stopPropagation();
    };

    document.body.addEventListener("click", addClickEventOnBody);
    popupRef.current.addEventListener("click", addClickEventOnPopup);
    mobilePopupContentRef.current.addEventListener(
      "click",
      addClickEventOnPopup
    );

    return () => {
      document.body.removeEventListener("click", addClickEventOnBody);
      popupRef.current.removeEventListener("click", addClickEventOnPopup);
      mobilePopupContentRef.current.removeEventListener(
        "click",
        addClickEventOnPopup
      );
    };
  }, [reference, open]);

  return (
    <>
      <div className={classNames(styles.popup_container, styles.web)}>
        <div
          style={{
            display: isOpen ? "block" : "none",
            top: pos.top,
            left: pos.left,
            right: pos.right,
            bottom: pos.bottom,
          }}
          className={styles.popup}
          ref={popupRef}
        >
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <div className={styles.item_inner}>
                    <div className={styles.item_icon}>
                      <IonIcon
                        icon={queue} //
                        slot="start"
                        className={styles.icon}
                      />
                    </div>
                    <p className={styles.item_label}>Add to queue</p>
                  </div>
                </li>
                <li className={styles.item}>
                  <div className={styles.item_inner}>
                    <div className={styles.item_icon}>
                      <IonIcon
                        icon={watchOutline}
                        slot="start"
                        className={styles.icon}
                      />
                    </div>
                    <p className={styles.item_label}>Save to Watch later</p>
                  </div>
                </li>
                <li className={styles.item}>
                  <div className={styles.item_inner}>
                    <div className={styles.item_icon}>
                      <IonIcon
                        icon={playlist}
                        slot="start"
                        className={styles.icon}
                      />
                    </div>
                    <p className={styles.item_label}>Save to playlist</p>
                  </div>
                </li>
                <li className={styles.item}>
                  <div className={styles.item_inner}>
                    <div className={styles.item_icon}>
                      <IonIcon
                        icon={share} //
                        slot="start"
                        className={styles.icon}
                      />
                    </div>
                    <p className={styles.item_label}>Share</p>
                  </div>
                </li>
                <li className={styles.item}>
                  <div className={styles.item_separator}></div>
                  <div className={styles.item_inner}>
                    <div className={styles.item_icon}>
                      <IonIcon
                        icon={notInterested} //
                        slot="start"
                        className={styles.icon}
                      />
                    </div>
                    <p className={styles.item_label}>Not interested</p>
                  </div>
                </li>
                <li className={styles.item}>
                  <div className={styles.item_inner}>
                    <div className={styles.item_icon}>
                      <IonIcon
                        icon={notRecommend} //
                        slot="start"
                        className={styles.icon}
                      />
                    </div>
                    <p className={styles.item_label}>
                      Don&apos;t recommend channel
                    </p>
                  </div>
                </li>
                <li className={styles.item}>
                  <div className={styles.item_inner}>
                    <div className={styles.item_icon}>
                      <IonIcon
                        icon={report} //
                        slot="start"
                        className={styles.icon}
                      />
                    </div>
                    <p className={styles.item_label}>Report</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames(styles.popup_container, styles.mobile)}>
        <div
          style={{
            display: isOpen ? "block" : "none",
          }}
          className={styles.popup_mobile}
        >
          <div className={styles.wrapper}>
            <div className={styles.content} ref={mobilePopupContentRef}>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <div className={styles.item_inner}>
                    <p className={styles.item_label}>Not interested</p>
                  </div>
                </li>
                <li className={styles.item}>
                  <div className={styles.item_inner}>
                    <p className={styles.item_label}>
                      Don&apos;t recommend channel
                    </p>
                  </div>
                </li>
                <li className={styles.item}>
                  <div className={styles.item_inner}>
                    <p className={styles.item_label}>Save to Watch later</p>
                  </div>
                </li>
                <li className={styles.item}>
                  <div className={styles.item_inner}>
                    <p className={styles.item_label}>Cancel</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
