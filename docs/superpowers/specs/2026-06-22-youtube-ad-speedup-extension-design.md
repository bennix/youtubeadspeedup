# YouTube Ad Speedup Chrome Extension Design

## Product Summary

Build a small Chrome Manifest V3 extension that speeds up YouTube ads while leaving normal video playback unchanged. The default ad speed is 8x. The user can switch the ad speed between 4x, 8x, and 16x from the extension popup.

Target user: a Chrome user who watches YouTube and wants ads to finish faster without changing normal video playback speed.

## Scope

In scope:

- Run only on `https://www.youtube.com/*`.
- Detect when the YouTube player is showing an ad.
- Set the page video element playback rate to the selected speed during ads.
- Restore playback rate to `1x` when the ad ends.
- Provide a popup with `4x`, `8x`, and `16x` controls.
- Persist the selected speed with `chrome.storage.sync`.
- Default to `8x` before the user chooses another speed.
- Document how to load the unpacked extension in Chrome.

Out of scope:

- Blocking, hiding, or skipping ads.
- Running on non-YouTube sites.
- Firefox, Safari, or Edge packaging.
- Per-site configuration.
- Analytics, remote services, or external dependencies.

## User Flow

1. User loads the unpacked extension in Chrome.
2. User opens YouTube.
3. Normal YouTube videos play at `1x`.
4. When YouTube starts an ad, the extension detects the ad state and sets the video playback rate to the configured speed.
5. Default configured speed is `8x`.
6. When the ad ends, the extension restores the video playback rate to `1x`.
7. User can open the extension popup and choose `4x`, `8x`, or `16x`.
8. The selected speed is saved and used for later ads.

## Architecture

Use a minimal static extension with no build step.

- `manifest.json`: Manifest V3 metadata, permissions, content script registration, popup registration.
- `src/content.js`: Runs on YouTube pages. Reads speed from storage, detects ad state, applies and restores playback speed.
- `src/popup.html`: Popup markup with three speed buttons.
- `src/popup.css`: Compact popup styling.
- `src/popup.js`: Saves selected speed and highlights the active option.
- `README.md`: Usage and Chrome installation instructions.

## Ad Detection

The content script should use YouTube page signals that are available in the DOM:

- Treat the player as showing an ad when `.html5-video-player` has an ad-related class such as `ad-showing` or `ad-interrupting`.
- Find the active video with `document.querySelector("video")`.
- Poll on a short interval and also observe DOM/class changes so single-page navigation and dynamic player updates continue to work.

This detection may need future adjustment if YouTube changes its DOM classes.

## State Management

Storage key:

- `adSpeed`: number, one of `4`, `8`, or `16`.

Default:

- `8`.

Content script state:

- Current selected ad speed.
- Whether the player was previously in ad mode.

The extension should avoid storing any browsing data beyond the selected speed.

## Error Handling

- If storage is unavailable or no speed has been saved, use `8`.
- If no video element is found, do nothing and retry on the next interval or DOM update.
- If the page is not in ad mode, force the video playback rate back to `1x`.
- If popup messaging fails because no YouTube tab is active, saving the speed is still enough; the content script will read it later.

## Permissions

Use the smallest practical permission set:

- `storage` for the selected speed.
- Host/content-script access for `https://www.youtube.com/*`.

No network requests or background service worker are required.

## Chrome Installation Instructions

After implementation:

1. Open Chrome and go to `chrome://extensions/`.
2. Turn on `Developer mode`.
3. Click `Load unpacked`.
4. Select the project folder: `/Users/nellertcai/AdBlock`.
5. Open `https://www.youtube.com/`.
6. Optional: click the extension icon and choose `4x`, `8x`, or `16x`.

## Acceptance Criteria

- Extension loads successfully through Chrome `Load unpacked`.
- On YouTube normal playback, video speed remains `1x`.
- During YouTube ads, video speed becomes `8x` by default.
- After an ad ends, video speed returns to `1x`.
- Popup offers exactly `4x`, `8x`, and `16x`.
- Selecting a speed persists across page reloads.
- The extension does not request broad host permissions outside YouTube.

## Verification Plan

- Validate `manifest.json` is valid Manifest V3 JSON.
- Run a syntax check for JavaScript files with Node.
- Manually load the unpacked extension in Chrome.
- Test on YouTube with normal videos and ad playback.
- Confirm popup speed selection persists after closing and reopening the popup.

## Implementation Checklist

- Create `manifest.json`.
- Create `src/content.js`.
- Create `src/popup.html`.
- Create `src/popup.css`.
- Create `src/popup.js`.
- Create `README.md` with install and usage instructions.
- Run syntax checks.
- Report any manual verification that could not be completed locally.

## Assumptions

- The extension is for personal/local use.
- The user wants acceleration only, not ad blocking or ad skipping.
- The target browser is Chrome on desktop.
- YouTube's current player classes are sufficient for ad-state detection.
