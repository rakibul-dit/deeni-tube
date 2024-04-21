import Head from "next/head";
import Script from "next/script";

import "tailwindcss/tailwind.css";
import "@ionic/react/css/core.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "../styles/fonts.css";
import "../styles/variables.css";
import "../styles/utils.css";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        ></meta>

        <link
          href="/img/favicon/favicon.ico"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/img/favicon/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />

        {/* <link rel="manifest" href="/manifest.webmanifest" /> */}
        {/* <script
          async
          src="https://cdn.jsdelivr.net/npm/pwacompat"
          crossOrigin="anonymous"
        ></script> */}
        {/* Manifest.json */}
        {/* <link rel="manifest" href="/manifest.json" /> */}
      </Head>
      <Component {...pageProps} />
      {/* <Script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons.js"></Script> */}
    </>
  );
}

export default MyApp;
