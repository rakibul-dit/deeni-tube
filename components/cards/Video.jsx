import classNames from "classnames";
import styles from "./Video.module.css";

const VideoCard = ({ thumb, avatar, title, channel, views, date }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.media}>
            <div className={styles.thumb}>
              <img src={thumb} alt="" />
            </div>

            <div className={styles.details}>
              <a className={styles.avatar} href="#">
                <img src={avatar} alt="" />
              </a>
              <div className={styles.meta}>
                <h3>{title}</h3>
                <div className={styles.metadata}>
                  <div className={styles.top}>{channel}</div>
                  <div className={styles.bottom}>
                    <span>{views} views</span>
                    <span>{date}</span>
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
