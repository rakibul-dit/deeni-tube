import { useParams } from "react-router-dom";

import classNames from "classnames";
import { youtube, constants } from "../../lib/config";
import { format } from "../../lib/format";
import {
  getYoutubeVideoDetailsByUrl,
  getRelatedVideosByUrl,
  getCommentThreadsByUrl,
} from "../../lib/fetch";
import {
  MiniPlayerStore,
  setMiniPlayerActive,
  setMiniPlayer,
} from "../../store";
import { useState, useEffect, useRef } from "react";
import {
  likeOutline,
  like,
  dislikeOutline,
  dislike,
  ellipsisHorizontal,
  ellipsisVertical,
  mini,
  angleDown,
  close,
  angleDouble,
} from "../../icons";
import { IonIcon, IonRouterLink } from "@ionic/react";
import Layout from "../core/Layout2";
import VideoCard from "../cards/Video2";
import ChipBar from "../ui/ChipBar";
import Loader from "../utils/Loader";
import useOnScreen from "../../hooks/useOnScreen";
import parse from "html-react-parser";
import SwipeablePanel from "../utils/SwipeablePanel";

import styles from "./RelatedVideos.module.css";

const getUrl = (previousPageData, relatedToVideoId) => {
  let pageToken = "";
  if (previousPageData !== null && previousPageData.nextPageToken !== null) {
    pageToken = `&pageToken=${previousPageData.nextPageToken}`;
  }

  return `${youtube.url}/search?key=${youtube.key}&part=snippet&relatedToVideoId=${relatedToVideoId}&maxResults=${constants.DEFAULT_PAGE_LIMIT}&type=video${pageToken}`;
};

const RelatedVideos = () => {
  let { id } = useParams();
  const [match, setMatch] = useState({
    params: {
      id: "zFZZeNnb-3k",
    },
  });

  useEffect(() => {
    setMatch({
      params: {
        id: id,
      },
    });
    console.log(match.params.id);
  }, []);

  const src = MiniPlayerStore.useState((s) => s.src);

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

    const fetchData = async () => {
      const res = await getRelatedVideosByUrl(url);
      // const playlists = await getAllPlaylists2();

      setData(res);
      setIsloadingMore(false);
    };

    fetchData().catch(console.error);

    // console.log(data);
  }, [match]);

  useEffect(() => {
    if (isVisible && !isLoadingMore && data.nextPageToken) {
      setIsloadingMore(true);

      const url = getUrl(data, match.params.id);

      const fetchData = async () => {
        const res = await getRelatedVideosByUrl(url);
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
    <div className={styles.secondary_inner}>
      <h3 className={styles.more_item}>Up next</h3>
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
  );
};

export default RelatedVideos;
