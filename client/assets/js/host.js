(function() {
  const { talk, emoji } = document.currentScript.dataset;
  if (!talk) {
    handleError("You need to specify a talk id to use this script");
    return false;
  }

  const emojiEls = {};

  loadScript("https://talkmoji.dev.f90.co.uk/socket.io/socket.io.js", init);

  function init() {
    const socket = window.io
      ? window.io("https://talkmoji.dev.f90.co.uk/host")
      : null;
    socket.on("on", handleEmojiOn);
    socket.on("off", handleEmojiOff);

    socket.emit("init", {
      talk,
      emoji
    });

    socket.on("error", handleError);
    socket.on("emoji", createBar);
  }

  function handleError(error) {
    alert(`Error: ${error}`);
    console.log(`Error: ${error}`); // eslint-disable-line no-console
  }

  function createBar(emojis) {
    const talkmojiEl = document.createElement("div");
    talkmojiEl.classList.add("Talkmoji");
    document.body.appendChild(talkmojiEl);

    emojis.forEach(emoji => {
      const containerEl = document.createElement("div");
      containerEl.classList.add("Talkmoji-emojiContainer");
      talkmojiEl.appendChild(containerEl);

      const emojiEl = document.createElement("span");
      emojiEl.classList.add("Talkmoji-emoji");
      containerEl.appendChild(emojiEl);

      emojiEl.dataset.size = 1;
      emojiEl.textContent = emoji;

      emojiEls[emoji] = emojiEl;
    });
  }

  function handleEmojiOn(data) {
    const el = emojiEls[data.emoji];
    if (!el) {
      return false;
    }
    let size = el.dataset.size;
    if (size < 10) {
      size++;
    }
    el.dataset.size = size;
  }

  function handleEmojiOff(data) {
    const el = emojiEls[data.emoji];
    if (!el) {
      return false;
    }
    let size = el.dataset.size;
    if (size > 1) {
      size--;
    }
    el.dataset.size = size;
  }

  function loadScript(src, callback) {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onreadystatechange = s.onload = function() {
      const state = s.readyState;
      if (!callback.done && (!state || /loaded|complete/.test(state))) {
        callback.done = true;
        callback();
      }
    };
    document.getElementsByTagName("head")[0].appendChild(s);
  }
})();
