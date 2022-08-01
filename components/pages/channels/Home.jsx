import { useState, useEffect } from "react";
import classNames from "classnames";
import { server } from "../../../lib/config";
import { youtube, constants } from "../../../lib/config";
import { format } from "../../../lib/format";
import { getAllPlaylists2, getYoutubeVideoListByUrl } from "../../../lib/fetch";
import Layout from "../../core/Layout";
import Tabs from "./Tabs";
import VideoCard from "../../cards/Video3";
import styles from "./Home.module.css";

const c_data = {
  id: "UCSJbGtTlrDami-tDGPUV9-w",
  title: "Academind",
  description: "There's always something to learn",
  avatar:
    "https://yt3.ggpht.com/ytc/AMLnZu_Uksjq0hZKO8HU1hqf8LTFE91m1CeiSOe__5L8BA=s88-c-k-c0x00ffffff-no-rj",
  viewCount: 15245698575482,
  subscriberCount: 8111,
  videoCount: 623,
};

const getUrl = (previousPageData, playlistId) => {
  let pageToken = "";
  if (previousPageData !== null && previousPageData.nextPageToken !== null) {
    pageToken = `&pageToken=${previousPageData.nextPageToken}`;
  }

  return `${youtube.url}/playlistItems?key=${youtube.key}&part=snippet&playlistId=${playlistId}&maxResults=${constants.DEFAULT_PAGE_LIMIT}${pageToken}`;
};

const ChannelHome = ({ id }) => {
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

  return (
    <Layout page="search">
      <div className={styles.wrapper}>
        <div className={styles.channel_info}>
          <div className={styles.tabs}>
            <Tabs id={id} />
          </div>
          <div className={styles.banner}>
            <img src="/img/banner/channel01.jpg" alt="" />
          </div>
          <div className={styles.meta}>
            <div className={styles.avatar}>
              <img
                src={
                  c_data.avatar
                    ? c_data.avatar
                    : `${server}/img/youtube/youtube-default.jpg`
                }
                alt=""
              />
            </div>
            <div className={styles.title}>{c_data.title}</div>
            <div className={styles.status}>Subscribed</div>
            <div className={styles.count}>
              <div className={styles.count_item}>
                <span>{format.count(c_data.subscriberCount)} subscribers</span>
              </div>
              <div className={styles.count_item}>
                <span>{format.count(c_data.videoCount)} videos</span>
              </div>
            </div>
            <div className={styles.desc}>{c_data.description}</div>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.uploads}>
            <div className={styles.uploads_title}>Popular uploads</div>
            <div className={styles.uploads_content}>
              {data.videos.map((video, index) => (
                <div className={styles.item} key={index}>
                  <VideoCard
                    {...video}
                    statistics={data.videoStats}
                    channelThumbnails={data.channels}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChannelHome;
