import Head from "next/head";
import { server } from "../../lib/config";

export default function Meta(props) {
  const commonTitle = "Quran.Tube";
  const title =
    props.title != "" ? props.title + " | " + commonTitle : "" + commonTitle;
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, uc-fitscreen=yes, viewport-fit=cover"
      />

      <meta name="mobile-wep-app-capable" content="yes" />
      <meta name="apple-mobile-wep-app-capable" content="yes" />

      <meta name="description" content={props.description || ""} />
      <meta name="author" content="" />
      <meta name="keywords" content="quran.tube" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

      {/* Android phone */}
      <meta name="theme-color" content="#ffffff" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* iOS phone */}
      <meta name="apple-mobile-web-app-title" content="Quran.Tube" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff" />

      {/* Windows phone */}
      <meta name="msapplication-navbutton-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      {/* <meta name="msapplication-TileImage" content="ms-icon-144x144.png" /> */}
      {/* <meta name="msapplication-config" content="browserconfig.xml" /> */}

      {/* Pinned Sites */}
      <meta name="application-name" content="Quran.Tube" />
      <meta name="msapplication-tooltip" content="Tooltip Text" />
      <meta name="msapplication-starturl" content="/" />

      {/* Tap highlighting */}
      <meta name="msapplication-tap-highlight" content="no" />

      {/* UC Mobile Browser */}
      <meta name="full-screen" content="yes" />
      <meta name="browsermode" content="application" />

      {/* Disable night mode for this page */}
      <meta name="nightmode" content="disable" />

      {/* Layout mode - content="fitscreen/standard" */}
      <meta name="layoutmode" content="fitscreen" />

      {/* imagemode - show image even in text only mode */}
      <meta name="imagemode" content="force" />

      {/* Orientation */}
      <meta name="screen-orientation" content="portrait" />

      {/* format-detection */}
      <meta name="format-detection" content="telephone=no" />

      {/* meta information for facebook */}
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:url" content={props.url || ""} key="ogurl" />
      <meta property="og:image" content={props.image || ""} key="ogimage" />
      <meta property="og:type" content={props.type || "website"} key="ogtype" />
      <meta
        property="og:description"
        content={props.description || ""}
        key="ogdesc"
      />
      <meta property="og:locale" content="" key="oglocale" />
      <meta property="og:site_name" content="Quran.Tube/" key="ogsitename" />

      {/* meta information for twitter */}
      <meta name="twitter:card" content="Quran.Tube" key="twcard" />
      <meta name="twitter:site" content="@quran.tube" key="twsite" />
      <meta name="twitter:url" content={props.url || ""} key="twurl" />
      <meta name="twitter:title" content={title} key="twtitle" />
      <meta
        name="twitter:description"
        content={props.description || ""}
        key="twdesc"
      />
      <meta name="twitter:image" content={props.image || ""} key="twimage" />

      {/* favicon */}
      {/* Main Link Tags */}
      <link
        href={`${server}/img/favicon/favicon-16x16.png`}
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href={`${server}/img/favicon/favicon-32x32.png`}
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link
        href={`${server}/img/favicon/favicon-48x48.png`}
        rel="icon"
        type="image/png"
        sizes="48x48"
      />

      {/* iOS */}
      <link
        href={`${server}/img/app/App_Logo_384.png`}
        rel="apple-touch-icon"
      />
      <link
        href={`${server}/img/app/App_Logo_192.png`}
        rel="apple-touch-icon"
        sizes="76x76"
      />
      <link
        href={`${server}/img/app/App_Logo_192.png`}
        rel="apple-touch-icon"
        sizes="120x120"
      />
      <link
        href={`${server}/img/app/App_Logo_192.png`}
        rel="apple-touch-icon"
        sizes="152x152"
      />
      <link
        href={`${server}/img/app/App_Logo_192.png`}
        rel="apple-touch-icon"
        sizes="180x180"
      />

      {/* Startup Image */}
      <link
        href={`${server}/img/app/App_Logo_384.png`}
        rel="apple-touch-startup-image"
      />

      {/* Pinned Tab */}
      <link href="path/to/icon.svg" rel="mask-icon" size="any" color="red" />

      {/* Android */}
      <link
        href={`${server}/img/app/App_Logo_192.png`}
        rel="icon"
        sizes="192x192"
      />
      <link
        href={`${server}/img/app/App_Logo_192.png`}
        rel="icon"
        sizes="128x128"
      />

      {/* UC Browser */}
      <link
        href={`${server}/img/favicon/favicon.ico`}
        rel="apple-touch-icon-precomposed"
        sizes="57x57"
      />
      <link
        href={`${server}/img/favicon/favicon.ico`}
        rel="apple-touch-icon"
        sizes="72x72"
      />

      {/* Others */}
      <link
        href={`${server}/img/favicon/favicon-16x16.png`}
        rel="shortcut icon"
        type="image/x-icon"
      />

      {/* page title */}
      <title>{title}</title>

      <link rel="manifest" href={`${server}/manifest.webmanifest`} />
      <script
        async
        src="https://cdn.jsdelivr.net/npm/pwacompat"
        crossOrigin="anonymous"
      ></script>

      {/*Manifest.json*/}
      <link href={`${server}/manifest.json`} rel="manifest" />

      {/* material icons - Icon Library */}
      {/* <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /> */}
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
        rel="stylesheet"
      />
    </Head>
  );
}
