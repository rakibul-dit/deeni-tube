const uploadPlaylistID = "UUbMys3ID_1S8D1mZuYkoG2A";

module.exports = {
  basePath: "",
  async redirects() {
    return [
      {
        source: "/watch",
        destination: `/watch/${uploadPlaylistID}`,
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["localhost", "deeni-tube.vercel.app", "i.ytimg.com"],
  },
};
