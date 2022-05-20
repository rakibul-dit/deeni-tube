import styles from "./Home.module.css";
import classNames from "classnames";
import Store, { UIStore } from "../../store";
import { getVideos } from "../../store/selectors";
import Layout from "../core/Layout";
import VideoCard from "../cards/Video";
import ChipBar from "../ui/ChipBar";

const Home = () => {
  const videos = Store.useState(getVideos);
  const isMini = UIStore.useState((s) => s.isMiniNav);

  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={classNames(styles.header, isMini ? styles.mini : "")}>
          <ChipBar />
        </div>

        <div className={styles.container}>
          <div className={styles.content}>
            {videos.map((video, index) => (
              <div className={styles.item} key={index}>
                <VideoCard {...video} />
              </div>
            ))}
            {videos.map((video, index) => (
              <div className={styles.item} key={index}>
                <VideoCard {...video} />
              </div>
            ))}
            {videos.map((video, index) => (
              <div className={styles.item} key={index}>
                <VideoCard {...video} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
