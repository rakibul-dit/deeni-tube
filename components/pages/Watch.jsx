import styles from "./Watch.module.css";
import classNames from "classnames";
import { UIStore } from "../../store";
import { youtube, constants } from "../../lib/config";
import { getAllPlaylists2, getRelatedVideosByUrl } from "../../lib/fetch";
import { useState, useEffect, useRef } from "react";
import Layout from "../core/Layout2";
import VideoCard from "../cards/Video2";
import ChipBar from "../ui/ChipBar";
import Loader from "../utils/Loader";
import useOnScreen from "../../hooks/useOnScreen";

const getUrl = (previousPageData, relatedToVideoId) => {
  let pageToken = "";
  if (previousPageData !== null && previousPageData.nextPageToken !== null) {
    pageToken = `&pageToken=${previousPageData.nextPageToken}`;
  }

  return `${youtube.url}/search?key=${youtube.key}&part=snippet&relatedToVideoId=${relatedToVideoId}&maxResults=${constants.DEFAULT_PAGE_LIMIT}&type=video${pageToken}`;
};

const Watch = ({ match }) => {
  const isMini = UIStore.useState((s) => s.isMiniNav);

  const ref = useRef();
  const isVisible = useOnScreen(ref);
  const [isLoadingMore, setIsloadingMore] = useState(true);

  const [data, setData] = useState({
    nextPageToken: null,
    numberOfPages: 0,
    videos: [],
    videoStats: {},
    channels: {},
  });

  useEffect(() => {
    const url = getUrl(data, match.params.id);

    console.log(url);

    const fetchData = async () => {
      const res = await getRelatedVideosByUrl(url);
      // const playlists = await getAllPlaylists2();

      setData(res);
      setIsloadingMore(false);
    };

    fetchData().catch(console.error);

    console.log(data);
  }, [match.params.id]);

  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.columns}>
          <div className={styles.primary}>
            <div className={styles.primary_inner}>
              <div id="player" className={styles.player}>
                <div className={styles.player_outer}>
                  <div className={styles.player_inner}>
                    <div className={styles.player_container}>
                      <iframe
                        frameBorder="0"
                        // allowFullScreen="1"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; fullscreen; picture-in-picture"
                        // title={title}
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${match.params.id}?autoplay=1&mute=0&enablejsapi=1`}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.secondary}>
            <div className={styles.secondary_inner}>
              <div className={styles.related_container}>
                {data.videos.map((video, index) => (
                  <div className={styles.related_item} key={index}>
                    <VideoCard
                      {...video}
                      statistics={data.videoStats}
                      channelThumbnails={data.channels}
                    />
                  </div>
                ))}

                <div ref={ref} className={styles.loader}>
                  {isLoadingMore && <Loader />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div
          className={classNames(
            styles.header,
            isMini ? styles.mini : "",
            "chipbar"
          )}
        >
          <ChipBar />
        </div> */}

        {/* <div className={styles.container}>
          <div className={styles.content}>
            <div className="">
              <div className=""></div>
            </div>
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default Watch;
