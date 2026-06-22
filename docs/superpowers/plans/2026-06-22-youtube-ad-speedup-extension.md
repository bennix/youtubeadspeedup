# YouTube Ad Speedup Extension Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local Chrome extension that speeds up YouTube ads at 8x by default, with popup controls for 4x, 8x, and 16x.

**Architecture:** Use a Manifest V3 extension with one YouTube content script and one popup. The content script detects YouTube ad state from player classes, applies the selected playback rate during ads, and restores `1x` outside ads. The popup stores the selected rate in `chrome.storage.sync`; the content script reacts to storage changes.

**Tech Stack:** Chrome Manifest V3, plain JavaScript, HTML, CSS, `chrome.storage.sync`.

---

### Task 1: Extension Manifest

**Files:**
- Create: `manifest.json`

- [ ] **Step 1: Create the manifest**

```json
{
  "manifest_version": 3,
  "name": "YouTube Ad Speedup",
  "description": "Speed up YouTube ads while keeping normal videos at 1x.",
  "version": "1.0.0",
  "permissions": ["storage"],
  "host_permissions": ["https://www.youtube.com/*"],
  "action": {
    "default_title": "YouTube Ad Speedup",
    "default_popup": "src/popup.html"
  },
  "content_scripts": [
    {
      "matches": ["https://www.youtube.com/*"],
      "js": ["src/content.js"],
      "run_at": "document_idle"
    }
  ]
}
```

- [ ] **Step 2: Verify JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('manifest.json', 'utf8')); console.log('manifest ok')"`

Expected: `manifest ok`

### Task 2: YouTube Content Script

**Files:**
- Create: `src/content.js`

- [ ] **Step 1: Implement ad detection and speed control**

```javascript
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
    return Boolean(player && AD_PLAYER_CLASSES.some((className) => player.classList.contains(className)));
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
```

- [ ] **Step 2: Verify syntax**

Run: `node --check src/content.js`

Expected: no syntax errors.

### Task 3: Popup

**Files:**
- Create: `src/popup.html`
- Create: `src/popup.css`
- Create: `src/popup.js`

- [ ] **Step 1: Create popup markup, styling, and behavior**

Use a compact popup with three buttons. Store selected speed under `adSpeed`; highlight the current speed.

- [ ] **Step 2: Verify popup script syntax**

Run: `node --check src/popup.js`

Expected: no syntax errors.

### Task 4: User Documentation

**Files:**
- Create: `README.md`

- [ ] **Step 1: Document install and usage**

Include Chrome local installation:

1. Open `chrome://extensions/`.
2. Enable `Developer mode`.
3. Click `Load unpacked`.
4. Select `/Users/nellertcai/AdBlock`.
5. Open YouTube and choose speed from the extension popup if desired.

- [ ] **Step 2: Final verification**

Run:

```bash
node -e "JSON.parse(require('fs').readFileSync('manifest.json', 'utf8')); console.log('manifest ok')"
node --check src/content.js
node --check src/popup.js
```

Expected: manifest parses and both JavaScript files pass syntax checks.
