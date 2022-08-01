import { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { IonContent, IonList, IonItem } from "@ionic/react";
import { UIStore } from "../../store";
import Layout from "../core/Layout";
import ChannelCard from "../cards/Channel";
import styles from "./Channels.module.css";

const data = [
  {
    id: "UCSJbGtTlrDami-tDGPUV9-w",
    title: "Academind",
    description:
      "There's always something to learn create courses and tutorials that teach you everything related to web development. No matter if it's programming languages like JavaScript, runtimes like NodeJS or popular frameworks like ReactJS, Angular or VueJS (and much more!). We got you covered.:",
    url: "UCSJbGtTlrDami-tDGPUV9-w",
    avatar:
      "https://yt3.ggpht.com/ytc/AMLnZu_Uksjq0hZKO8HU1hqf8LTFE91m1CeiSOe__5L8BA=s88-c-k-c0x00ffffff-no-rj",
    viewCount: "15245698575482",
    subscriberCount: "811142",
    videoCount: "623",
  },
  {
    id: "UCSJbGtTlrDami-tDGPUV9-w",
    title: "Anisul Islam",
    description:
      "There's always something to learn create courses and tutorials that teach you everything related to web development. No matter if it's programming languages like JavaScript, runtimes like NodeJS or popular frameworks like ReactJS, Angular or VueJS (and much more!). We got you covered.:",
    url: "UCSJbGtTlrDami-tDGPUV9-w",
    avatar:
      "https://yt3.ggpht.com/ytc/AMLnZu9qwWLjx8qLFObE0TDxQytCm3kAy02qy3cnv-tWew=s176-c-k-c0x00ffffff-no-rj-mo",
    viewCount: "15245698575482",
    subscriberCount: "811142",
    videoCount: "623",
  },
  {
    id: "UCSJbGtTlrDami-tDGPUV9-w",
    title: "Hitesh Choudhary",
    description:
      "There's always something to learn create courses and tutorials that teach you everything related to web development. No matter if it's programming languages like JavaScript, runtimes like NodeJS or popular frameworks like ReactJS, Angular or VueJS (and much more!). We got you covered.:",
    url: "UCSJbGtTlrDami-tDGPUV9-w",
    avatar:
      "https://yt3.ggpht.com/ytc/AMLnZu--BW5u0yDUi9roKCJ5iW3NSFdvxTToEMOYzXjcyw=s176-c-k-c0x00ffffff-no-rj-mo",
    viewCount: "15245698575482",
    subscriberCount: "811142",
    videoCount: "623",
  },
];

const Channels = () => {
  return (
    <Layout page="search">
      <div className={styles.list}>
        {data.map((channel, index) => (
          <div className={styles.item} key={index}>
            <ChannelCard {...channel} />
          </div>
        ))}
        {data.map((channel, index) => (
          <div className={styles.item} key={index}>
            <ChannelCard {...channel} />
          </div>
        ))}
        {data.map((channel, index) => (
          <div className={styles.item} key={index}>
            <ChannelCard {...channel} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Channels;
