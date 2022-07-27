import classNames from "classnames";
import styles from "./Video.module.css";
import { server } from "../../lib/config";
import { format } from "../../lib/format";
import { IonRouterLink, IonIcon } from "@ionic/react";
import { ellipsisVertical } from "../../icons";
import { useRef, useEffect, useState } from "react";
import {
  PopupStore,
  setPopupOpen,
  setPopupReference,
  setPopupVideoId,
  PreviewStore,
  setPreviewOpen,
  setPreviewReference,
  setPreviewVideo,
} from "../../store";

const VideoCard = ({
  id,
  image,
  title,
  publishedAt,
  channelId,
  channelTitle,
  statistics,
  channelThumbnails,
}) => {
  const open = PopupStore.useState((s) => s.open);
  const reference = PopupStore.useState((s) => s.reference);
  const popupReference = useRef(null);

  const handlePopup = (e) => {
    e.stopPropagation();
    setPopupReference(popupReference.current);
    setPopupVideoId(id);
    setPopupOpen(true);
  };

  useEffect(() => {
    if (open && reference == popupReference.current) {
      popupReference.current.classList.add(styles.active);
    } else {
      popupReference.current.classList.remove(styles.active);
    }
  }, [open, reference]);

  // preview
  const previewOpen = PreviewStore.useState((s) => s.open);
  const previewReference = PreviewStore.useState((s) => s.reference);
  const previewRef = useRef(null);

  const [timeout, updateTimeout] = useState(null);

  const handlePreviewOnHover = (hover) => {
    // e.stopPropagation();
    if (hover) {
      updateTimeout(
        setTimeout(() => {
          setPreviewReference(previewRef.current);
          setPreviewVideo({
            id,
            image,
            title,
            publishedAt,
            channelId,
            channelTitle,
            statistics,
            channelThumbnails,
          });
          setPreviewOpen(true);
        }, 1000)
      );
    } else {
      clearTimeout(timeout);
      setPreviewOpen(false);
    }
  };

  useEffect(() => {
    if (previewOpen && previewReference == previewRef.current) {
      previewRef.current.classList.add(styles.active);
    } else {
      previewRef.current.classList.remove(styles.active);
    }
  }, [previewOpen, previewReference]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.media}>
            <IonRouterLink
              routerLink={`/watch/${id}`} //
              className={styles.thumb}
            >
              <img
                src={
                  image
                    ? `http://i.ytimg.com/vi/${id}/mqdefault.jpg`
                    : `${server}/img/youtube/youtube-default.jpg`
                }
                alt=""
                ref={previewRef}
                onMouseEnter={() => handlePreviewOnHover(true)}
                onMouseLeave={() => handlePreviewOnHover(false)}
              />
            </IonRouterLink>

            <div className={styles.details}>
              <IonRouterLink
                routerLink={`/watch/${id}`} //
                className={styles.avatar}
              >
                <img
                  src={channelThumbnails ? channelThumbnails[channelId] : ""} //
                  alt=""
                />
              </IonRouterLink>
              <div className={styles.meta}>
                <div className={styles.meta_top}>
                  <IonRouterLink
                    routerLink={`/watch/${id}`}
                    className={styles.title}
                  >
                    <h3>{title}</h3>
                  </IonRouterLink>
                  <div className={styles.popup_button} ref={popupReference}>
                    <IonIcon
                      icon={ellipsisVertical}
                      slot="start"
                      className={styles.icon}
                      onClick={(e) => handlePopup(e)}
                    />
                  </div>
                </div>

                <div className={styles.metadata}>
                  <div className={styles.top}>{channelTitle}</div>
                  <div className={styles.bottom}>
                    <span>
                      {statistics ? format.count(statistics[id]) : ""} views
                    </span>
                    <span>{format.date(publishedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
