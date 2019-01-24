(function() {
  const socket = window.io ? window.io("/device") : null;

  const href = window.location.href;
  const talk = href.substr(href.lastIndexOf("/") + 1);
  const talkmojiEl = document.querySelector(".js-Talkmoji");

  socket.emit("requestEmoji", { talk });
  socket.on("no-emoji", showError);
  socket.on("emoji", showEmoji);

  function showEmoji(emojis) {
    const listEl = document.createElement("div");
    listEl.classList.add("Talkmoji-list");
    talkmojiEl.appendChild(listEl);

    emojis.forEach(emoji => {
      const itemEl = document.createElement("li");
      itemEl.classList.add("Talkmoji-item");
      listEl.appendChild(itemEl);

      const buttonEl = document.createElement("button");
      buttonEl.classList.add("Talkmoji-trigger");
      itemEl.appendChild(buttonEl);

      const spanEl = document.createElement("span");
      spanEl.classList.add("Talkmoji-emoji");
      spanEl.textContent = emoji;
      buttonEl.appendChild(spanEl);

      buttonEl.addEventListener("touchstart", handleTouchStart);
      buttonEl.addEventListener("touchend", handleTouchEnd);
      buttonEl.addEventListener("mousedown", handleTouchStart);
      buttonEl.addEventListener("mouseup", handleTouchEnd);
    });
  }

  function handleTouchStart(e) {
    const emoji = e.target.querySelector("span").textContent;
    socket.emit("on", {
      emoji
    });
    e.target.classList.add("is-active");
  }

  function handleTouchEnd(e) {
    const emoji = e.target.querySelector("span").textContent;
    socket.emit("off", {
      emoji
    });
    e.target.classList.remove("is-active");
  }

  function showError() {
    const errorEl = document.createElement("div");
    errorEl.classList.add("Talkmoji-error");
    talkmojiEl.appendChild(errorEl);

    const textEl = document.createElement("p");
    textEl.textContent = "No talk found ☹️ (Double-check the URL...)";
    errorEl.appendChild(textEl);
  }
})();
