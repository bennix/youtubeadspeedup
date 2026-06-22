(() => {
  const DEFAULT_SPEED = 8;
  const ALLOWED_SPEEDS = new Set([4, 8, 16]);
  const CHECK_INTERVAL_MS = 500;
  const STORAGE_KEY = "adSpeed";
  const AD_PLAYER_CLASSES = ["ad-showing", "ad-interrupting"];

  let adSpeed = DEFAULT_SPEED;
  let wasInAd = false;

  function normalizeSpeed(value) {
    const speed = Number(value);
    return ALLOWED_SPEEDS.has(speed) ? speed : DEFAULT_SPEED;
  }

  function getVideo() {
    return document.querySelector("video");
  }

  function getPlayer() {
    return document.querySelector(".html5-video-player");
  }

  function isAdShowing() {
    const player = getPlayer();
    return Boolean(
      player &&
        AD_PLAYER_CLASSES.some((className) => player.classList.contains(className))
    );
  }

  function setPlaybackRate(video, rate) {
    if (video.playbackRate !== rate) {
      video.playbackRate = rate;
    }
  }

  function updatePlaybackRate() {
    const video = getVideo();
    if (!video) {
      return;
    }

    if (isAdShowing()) {
      wasInAd = true;
      setPlaybackRate(video, adSpeed);
      return;
    }

    if (wasInAd || video.playbackRate !== 1) {
      wasInAd = false;
      setPlaybackRate(video, 1);
    }
  }

  function loadSpeed() {
    chrome.storage.sync.get({ [STORAGE_KEY]: DEFAULT_SPEED }, (items) => {
      adSpeed = normalizeSpeed(items[STORAGE_KEY]);
      updatePlaybackRate();
    });
  }

  function watchStorage() {
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName !== "sync" || !changes[STORAGE_KEY]) {
        return;
      }

      adSpeed = normalizeSpeed(changes[STORAGE_KEY].newValue);
      updatePlaybackRate();
    });
  }

  function watchPlayerChanges() {
    const observer = new MutationObserver(updatePlaybackRate);
    observer.observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ["class"]
    });
  }

  loadSpeed();
  watchStorage();
  watchPlayerChanges();
  window.setInterval(updatePlaybackRate, CHECK_INTERVAL_MS);
})();
