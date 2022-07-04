import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import MiniPlayer from "./player/MiniPlayer";
import Popup from "./utils/PopupPrimary";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Search from "./pages/Search";

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addListener(async (status) => {
    try {
      await StatusBar.setStyle({
        style: status.matches ? Style.Dark : Style.Light,
      });
    } catch {}
  });

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <MiniPlayer />
          <Popup />
          <IonRouterOutlet id="main">
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/watch/:id" component={Watch} />
            <Route exact path="/search" component={Search} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
