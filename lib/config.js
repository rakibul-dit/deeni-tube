export const server =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://deeni-tube.vercel.app/";

export const youtubeKeys = {
  key1: "AIzaSyDKvwnzMGZ6CkUY53is9Zmga-JusrU-KwU",
  key2: "AIzaSyD7v54j77Cm59exRklmX6JjdDYYHF4QEtM",
  key3: "AIzaSyCpbqMuv6-6cWFzHIMzxTH_Hiz-NxW1RIM",
};

export const youtube = {
  url: "https://www.googleapis.com/youtube/v3",
  key: youtubeKeys.key1,
  channelID: "UCbMys3ID_1S8D1mZuYkoG2A",
  uploadPlaylistID: "UUbMys3ID_1S8D1mZuYkoG2A",
};

export const constants = {
  DEFAULT_PAGE_LIMIT: 20,
  MAX_YOUTUBE_PAGE_LIMIT: 50,
  YOUTUBE_RELATED_VIDEOS_PAGE_LIMIT: 4,
};
