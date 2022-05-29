import styles from "./Watch.module.css";
import classNames from "classnames";
import { youtube, constants } from "../../lib/config";
import { format } from "../../lib/format";
import {
  getYoutubeVideoDetailsByUrl,
  getRelatedVideosByUrl,
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
} from "../../icons";
import { IonIcon, IonRouterLink } from "@ionic/react";
import Layout from "../core/Layout2";
import VideoCard from "../cards/Video2";
import ChipBar from "../ui/ChipBar";
import Loader from "../utils/Loader";
import useOnScreen from "../../hooks/useOnScreen";
import parse from "html-react-parser";

const getUrl = (previousPageData, relatedToVideoId) => {
  let pageToken = "";
  if (previousPageData !== null && previousPageData.nextPageToken !== null) {
    pageToken = `&pageToken=${previousPageData.nextPageToken}`;
  }

  return `${youtube.url}/search?key=${youtube.key}&part=snippet&relatedToVideoId=${relatedToVideoId}&maxResults=${constants.DEFAULT_PAGE_LIMIT}&type=video${pageToken}`;
};

const Watch = ({ match }) => {
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
  }, [match.params.id]);

  const [videoDetail, setVideoDetail] = useState({});

  useEffect(() => {
    const url = `${youtube.url}/videos?key=${youtube.key}&part=snippet,statistics&id=${match.params.id}`;

    const fetchData = async () => {
      const res = await getYoutubeVideoDetailsByUrl(url);
      setVideoDetail(res);
      setMiniPlayer({
        src: match.params.id,
        title: res.title,
        subTitle: res.channelTitle,
      });
    };

    fetchData().catch(console.error);
  }, [match.params.id]);

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

  const urlify = (text) => {
    let urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
  };

  const parser = (text) => {
    let res = "";
    if (!text) return res;

    text.split("\n").map((item) => {
      let url = urlify(item);
      res += "<p>" + url + "<br />" + "</p>";
    });

    return res;
  };

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
                      <button
                        className={styles.mini_btn}
                        onClick={() => setMiniPlayerActive(true)}
                      >
                        <IonIcon
                          icon={mini} //
                          slot="start"
                          className={styles.mini_icon}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.detail}>
                <div className={styles.title_area}>
                  <h2 className={styles.title}>{videoDetail.title}</h2>
                  <div className={styles.meta_area}>
                    <div className={styles.left}>
                      <div className={styles.meta}>
                        <span>
                          {videoDetail.viewCount &&
                            format.count(videoDetail.viewCount)}{" "}
                          views
                        </span>
                        <span>
                          {videoDetail.publishedAt &&
                            format.date(videoDetail.publishedAt)}
                        </span>
                      </div>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.actions}>
                        <div className={styles.action} title="I like this">
                          <IonIcon
                            icon={likeOutline} //
                            slot="start"
                            className={styles.icon}
                          />
                          <span>
                            {videoDetail.likeCount > 0
                              ? format.count(videoDetail.likeCount)
                              : "0"}
                          </span>
                        </div>
                        <div className={styles.action} title="I dislike this">
                          <IonIcon
                            icon={dislikeOutline} //
                            slot="start"
                            className={styles.icon}
                          />
                          <span>
                            {videoDetail.dislikeCount > 0
                              ? videoDetail.dislikeCount
                              : "0"}
                          </span>
                        </div>
                        <div className={styles.action}>
                          <IonIcon
                            icon={ellipsisHorizontal} //
                            slot="start"
                            className={styles.icon}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.desc_area}>
                  <div className={styles.channel}>
                    <a
                      href={`https://www.youtube.com/channel/${videoDetail.channelId}`}
                      target="_blank"
                      className={styles.avatar}
                    >
                      <img
                        src={videoDetail ? videoDetail.channelAvatar : ""} //
                        alt=""
                      />
                    </a>

                    <a
                      href={`https://www.youtube.com/channel/${videoDetail.channelId}`}
                      target="_blank"
                      className={styles.c_title}
                    >
                      {videoDetail.channelTitle}
                    </a>
                  </div>
                  <div className={styles.description}>
                    {parse(parser(videoDetail.description))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.secondary}>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Watch;
