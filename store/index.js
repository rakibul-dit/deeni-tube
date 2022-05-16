import { Store as PullStateStore } from "pullstate";

import { lists, homeItems, notifications } from "../data";
import { videos } from "../data/videos";

const Store = new PullStateStore({
  safeAreaTop: 0,
  safeAreaBottom: 0,
  menuOpen: false,
  notificationsOpen: false,
  currentPage: null,
  homeItems,
  videos,
  lists,
  notifications,
  settings: {
    enableNotifications: true,
  },
});

export const UIStore = new PullStateStore({
  isMiniNav: false,
});

export const toggleMiniNav = (isActive) => {
  UIStore.update((s) => {
    s.isMiniNav = isActive;
  });
};

export default Store;
