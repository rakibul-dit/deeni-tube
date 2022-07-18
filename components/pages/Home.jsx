import styles from "./Home.module.css";
import classNames from "classnames";
import { UIStore } from "../../store";
import { youtube, constants } from "../../lib/config";
import { getAllPlaylists2, getYoutubeVideoListByUrl } from "../../lib/fetch";
import { useState, useEffect, useRef } from "react";
import Layout from "../core/Layout";
import VideoCard from "../cards/Video";
import ChipBar from "../ui/ChipBar";
import Loader from "../utils/Loader";
import useOnScreen from "../../hooks/useOnScreen";
import Previewer from "../utils/Previewer";

const getUrl = (previousPageData, playlistId) => {
  let pageToken = "";
  if (previousPageData !== null && previousPageData.nextPageToken !== null) {
    pageToken = `&pageToken=${previousPageData.nextPageToken}`;
  }

  return `${youtube.url}/playlistItems?key=${youtube.key}&part=snippet&playlistId=${playlistId}&maxResults=${constants.DEFAULT_PAGE_LIMIT}${pageToken}`;
};

const Home = () => {
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
    const url = getUrl(data, youtube.uploadPlaylistID);

    const fetchData = async () => {
      const res = await getYoutubeVideoListByUrl(url);
      // const playlists = await getAllPlaylists2();

      setData(res);
      setIsloadingMore(false);
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    if (isVisible && !isLoadingMore && data.nextPageToken) {
      setIsloadingMore(true);

      const url = getUrl(data, youtube.uploadPlaylistID);

      const fetchData = async () => {
        const res = await getYoutubeVideoListByUrl(url);
        // const playlists = await getAllPlaylists2();

        const newData = {
          nextPageToken: res.nextPageToken,
          numberOfPages: res.numberOfPages,
          videos: data.videos.concat(res.videos),
          videoStats: { ...data.videoStats, ...res.videoStats },
          channels: { ...data.channels, ...res.channels },
        };

        setData(newData);
        setIsloadingMore(false);
      };

      fetchData().catch(console.error);
    }

    // console.log(isVisible, isLoadingMore);
  }, [isVisible, isLoadingMore]);

  return (
    <Layout>
      <Previewer />

      <div className={styles.wrapper}>
        <div
          className={classNames(
            styles.header,
            isMini ? styles.mini : "",
            "chipbar"
          )}
        >
          <ChipBar />
        </div>

        <div className={styles.container}>
          <div className={styles.content}>
            {data.videos.map((video, index) => (
              <div className={styles.item} key={index}>
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
    </Layout>
  );
};

export default Home;
