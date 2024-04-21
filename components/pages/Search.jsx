import styles from "./Search.module.css";
import classNames from "classnames";
import { UIStore } from "../../store";
import { youtube, constants, server } from "../../lib/config";
import { getYoutubeSearchVideosByUrl } from "../../lib/fetch";
import { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
// import {
//   IonContent,
//   IonItem,
//   IonLabel,
//   IonList,
//   IonMenuButton,
//   IonPage,
//   IonSearchbar,
//   IonTitle,
//   IonToolbar,
// } from "@ionic/react";
import Layout from "../core/Layout";
import VideoCard from "../cards/Video3";
// import ChipBar from "../ui/ChipBar";
import Loader from "../utils/Loader";
import useOnScreen from "../../hooks/useOnScreen";
import Meta from "../core/Meta";

const getUrl = (previousPageData, query) => {
  let pageToken = "";
  if (previousPageData !== null && previousPageData.nextPageToken !== null) {
    pageToken = `&pageToken=${previousPageData.nextPageToken}`;
  }

  const url = `${youtube.url}/search?key=${youtube.key}&part=snippet&channelId=${youtube.channelID}&maxResults=${constants.DEFAULT_PAGE_LIMIT}&q=${query}&type=video${pageToken}`;

  return url;
};

const Search = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [query, setQuery] = useState("");
  const [data, setData] = useState({
    nextPageToken: null,
    numberOfPages: 0,
    videos: [],
    videoStats: {},
    channels: {},
  });
  // const isMini = UIStore.useState((s) => s.isMiniNav);
  const ref = useRef();
  const isVisible = useOnScreen(ref);
  const [isLoadingMore, setIsloadingMore] = useState(true);

  useEffect(() => {
    setQuery(params.get("key") || "");
    setData({
      nextPageToken: null,
      numberOfPages: 0,
      videos: [],
      videoStats: {},
      channels: {},
    });
    console.log(query);
  }, [query, location]);

  useEffect(() => {
    const url = getUrl(data, query);

    const fetchData = async () => {
      const res = await getYoutubeSearchVideosByUrl(url);
      setData(res);
      setIsloadingMore(false);
    };

    fetchData().catch(console.error);
  }, [query, location]);

  useEffect(() => {
    if (isVisible && !isLoadingMore && data.nextPageToken) {
      setIsloadingMore(true);

      const url = getUrl(data, query);

      const fetchData = async () => {
        const res = await getYoutubeSearchVideosByUrl(url);

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
    <>
      <Meta
        title="Search"
        description="Quran.Tube Search"
        url={`${server}/search`}
        image={`${server}/img/logo/default_share.png`}
        type="website"
      />
      <div className={styles.wrapper}>
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
    </>
  );
};

export default Search;
