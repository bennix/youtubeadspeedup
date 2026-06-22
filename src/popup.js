(() => {
  const DEFAULT_SPEED = 8;
  const ALLOWED_SPEEDS = new Set([4, 8, 16]);
  const STORAGE_KEY = "adSpeed";

  const buttons = Array.from(document.querySelectorAll("[data-speed]"));
  const status = document.querySelector("#status");

  function normalizeSpeed(value) {
    const speed = Number(value);
    return ALLOWED_SPEEDS.has(speed) ? speed : DEFAULT_SPEED;
  }

  function setStatus(message) {
    status.textContent = message;
  }

  function highlightSpeed(speed) {
    buttons.forEach((button) => {
      button.classList.toggle("active", Number(button.dataset.speed) === speed);
    });
  }

  function saveSpeed(speed) {
    chrome.storage.sync.set({ [STORAGE_KEY]: speed }, () => {
      highlightSpeed(speed);
      setStatus(`Using ${speed}x for ads`);
    });
  }

  function loadSpeed() {
    chrome.storage.sync.get({ [STORAGE_KEY]: DEFAULT_SPEED }, (items) => {
      const speed = normalizeSpeed(items[STORAGE_KEY]);
      highlightSpeed(speed);
      setStatus(`Using ${speed}x for ads`);
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      saveSpeed(normalizeSpeed(button.dataset.speed));
    });
  });

  loadSpeed();
})();
