# YouTube Ad Speedup

## 简体中文

一个本地 Chrome 扩展：只在 YouTube 广告播放时加速，默认 `8x`，正常视频保持 `1x`。

### 功能

- 默认把 YouTube 广告加速到 `8x`。
- 可在扩展弹窗选择 `4x`、`8x`、`16x`。
- 广告结束后自动恢复正常视频速度 `1x`。
- 只在 `https://www.youtube.com/*` 运行。
- 不拦截、不隐藏、不跳过广告；只调整广告视频播放速度。

### 在 Chrome 里安装

1. 打开 Chrome。
2. 地址栏输入 `chrome://extensions/` 并回车。
3. 打开右上角的 `Developer mode`。
4. 点击 `Load unpacked`。
5. 选择这个项目文件夹。
6. 打开 `https://www.youtube.com/`。
7. 如需调整速度，点击扩展图标，选择 `4x`、`8x` 或 `16x`。

### 验证

```bash
node -e "JSON.parse(require('fs').readFileSync('manifest.json', 'utf8')); console.log('manifest ok')"
node --check src/content.js
node --check src/popup.js
```

如果 YouTube 更改播放器 DOM class，广告检测逻辑可能需要更新。

---

## 繁體中文

一個本機 Chrome 擴充功能：只在 YouTube 廣告播放時加速，預設 `8x`，正常影片保持 `1x`。

### 功能

- 預設將 YouTube 廣告加速到 `8x`。
- 可在擴充功能彈出視窗選擇 `4x`、`8x`、`16x`。
- 廣告結束後自動恢復正常影片速度 `1x`。
- 只在 `https://www.youtube.com/*` 執行。
- 不攔截、不隱藏、不跳過廣告；只調整廣告影片播放速度。

### 在 Chrome 中安裝

1. 開啟 Chrome。
2. 在網址列輸入 `chrome://extensions/` 並按 Enter。
3. 開啟右上角的 `Developer mode`。
4. 點選 `Load unpacked`。
5. 選擇此專案資料夾。
6. 開啟 `https://www.youtube.com/`。
7. 如需調整速度，點選擴充功能圖示，選擇 `4x`、`8x` 或 `16x`。

### 驗證

```bash
node -e "JSON.parse(require('fs').readFileSync('manifest.json', 'utf8')); console.log('manifest ok')"
node --check src/content.js
node --check src/popup.js
```

如果 YouTube 變更播放器 DOM class，廣告偵測邏輯可能需要更新。

---

## English

A local Chrome extension that speeds up YouTube ads only. The default ad speed is `8x`, while normal videos stay at `1x`.

### Features

- Speeds up YouTube ads to `8x` by default.
- Lets you choose `4x`, `8x`, or `16x` from the extension popup.
- Restores normal video playback to `1x` after an ad ends.
- Runs only on `https://www.youtube.com/*`.
- Does not block, hide, or skip ads; it only changes ad video playback speed.

### Install in Chrome

1. Open Chrome.
2. Go to `chrome://extensions/`.
3. Enable `Developer mode`.
4. Click `Load unpacked`.
5. Select this project folder.
6. Open `https://www.youtube.com/`.
7. To change the speed, click the extension icon and choose `4x`, `8x`, or `16x`.

### Verify

```bash
node -e "JSON.parse(require('fs').readFileSync('manifest.json', 'utf8')); console.log('manifest ok')"
node --check src/content.js
node --check src/popup.js
```

If YouTube changes its player DOM classes, the ad detection logic may need an update.

---

## 日本語

YouTube 広告の再生中だけ速度を上げるローカル Chrome 拡張機能です。広告の既定速度は `8x`、通常の動画は `1x` のままです。

### 機能

- YouTube 広告を既定で `8x` に加速します。
- 拡張機能のポップアップから `4x`、`8x`、`16x` を選択できます。
- 広告終了後、通常動画の再生速度を `1x` に戻します。
- `https://www.youtube.com/*` でのみ動作します。
- 広告のブロック、非表示、スキップは行わず、広告動画の再生速度だけを変更します。

### Chrome へのインストール

1. Chrome を開きます。
2. アドレスバーに `chrome://extensions/` と入力して開きます。
3. 右上の `Developer mode` を有効にします。
4. `Load unpacked` をクリックします。
5. このプロジェクトフォルダを選択します。
6. `https://www.youtube.com/` を開きます。
7. 速度を変更する場合は、拡張機能アイコンをクリックして `4x`、`8x`、`16x` のいずれかを選択します。

### 検証

```bash
node -e "JSON.parse(require('fs').readFileSync('manifest.json', 'utf8')); console.log('manifest ok')"
node --check src/content.js
node --check src/popup.js
```

YouTube がプレーヤーの DOM class を変更した場合、広告検出ロジックの更新が必要になることがあります。

---

## 한국어

YouTube 광고가 재생될 때만 속도를 높이는 로컬 Chrome 확장 프로그램입니다. 광고 기본 속도는 `8x`이고, 일반 영상은 `1x`를 유지합니다.

### 기능

- YouTube 광고를 기본 `8x` 속도로 재생합니다.
- 확장 프로그램 팝업에서 `4x`, `8x`, `16x`를 선택할 수 있습니다.
- 광고가 끝나면 일반 영상 재생 속도를 `1x`로 되돌립니다.
- `https://www.youtube.com/*`에서만 동작합니다.
- 광고를 차단하거나 숨기거나 건너뛰지 않으며, 광고 영상의 재생 속도만 변경합니다.

### Chrome에 설치

1. Chrome을 엽니다.
2. 주소창에 `chrome://extensions/`를 입력해 엽니다.
3. 오른쪽 위의 `Developer mode`를 켭니다.
4. `Load unpacked`를 클릭합니다.
5. 이 프로젝트 폴더를 선택합니다.
6. `https://www.youtube.com/`를 엽니다.
7. 속도를 바꾸려면 확장 프로그램 아이콘을 클릭하고 `4x`, `8x`, `16x` 중 하나를 선택합니다.

### 검증

```bash
node -e "JSON.parse(require('fs').readFileSync('manifest.json', 'utf8')); console.log('manifest ok')"
node --check src/content.js
node --check src/popup.js
```

YouTube가 플레이어 DOM class를 변경하면 광고 감지 로직을 업데이트해야 할 수 있습니다.
