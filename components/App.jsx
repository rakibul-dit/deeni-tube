import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Nav from "./core/Nav";
import Tabs from "./pages/Tabs";

import Home from "./pages/Home";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2";

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
          {/* <Nav /> */}
          <IonRouterOutlet id="main">
            {/* <Route exact path="/tabs" render={() => <Tabs />} />
            <Route exact path="/" render={() => <Redirect to="/tabs" />} /> */}
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/page1" render={() => <Page1 />} />
            <Route exact path="/page2" render={() => <Page2 />} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
