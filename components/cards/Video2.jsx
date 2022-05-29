import classNames from "classnames";
import styles from "./Video2.module.css";
import { server } from "../../lib/config";
import { format } from "../../lib/format";
import { IonRouterLink } from "@ionic/react";

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
              />
            </IonRouterLink>

            <div className={styles.details}>
              <a
                href={`https://www.youtube.com/channel/${channelId}`}
                target="_blank"
                rel="noreferrer"
                className={styles.avatar}
              >
                <img
                  src={channelThumbnails ? channelThumbnails[channelId] : ""} //
                  alt=""
                />
              </a>

              <div className={styles.meta}>
                <IonRouterLink routerLink={`/watch/${id}`}>
                  <h3>{title}</h3>
                </IonRouterLink>

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
