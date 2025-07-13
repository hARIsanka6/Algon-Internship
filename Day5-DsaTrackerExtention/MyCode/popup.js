const ALGON_PROBLEM_KEY = "ALGON_PROBLEM_KEY";
const assetsURLMap = {
  play: chrome.runtime.getURL("assets/play.png"),
  delete: chrome.runtime.getURL("assets/delete.png")
};

const bookmarkSection = document.getElementById("bookmarks");

document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ type: "GET_BOOKMARKS" }, (response) => {
    viewBookmarks(response.bookmarks || []);
  });
});

function viewBookmarks(bookmarks) {
  bookmarkSection.innerHTML = bookmarks.length ? "" : "<i>No Bookmarks to Show</i>";
  bookmarks.forEach(bookmark => addNewBookmark(bookmark));
}

function addNewBookmark(bookmark) {
  const newBookmark = document.createElement("div");
  const bookmarkTitle = document.createElement("div");
  const bookmarkControls = document.createElement("div");

  bookmarkTitle.textContent = bookmark.name;
  bookmarkTitle.classList.add("bookmark-title");

  setControlAttributes(assetsURLMap.play, onPlay, bookmarkControls);
  setControlAttributes(assetsURLMap.delete, onDelete, bookmarkControls);
  bookmarkControls.classList.add("bookmark-controls");

  newBookmark.classList.add("bookmark");
  newBookmark.append(bookmarkTitle, bookmarkControls);
  newBookmark.setAttribute("url", bookmark.url);
  newBookmark.setAttribute("bookmark-id", bookmark.id);
  bookmarkSection.appendChild(newBookmark);
}

function setControlAttributes(src, handler, parentDiv) {
  const controlElement = document.createElement("img");
  controlElement.src = src;
  controlElement.style.cursor = "pointer";
  controlElement.addEventListener("click", handler);
  parentDiv.appendChild(controlElement);
}

function onPlay(event) {
  const problemUrl = event.target.closest(".bookmark").getAttribute("url");
  window.open(problemUrl, "_blank");
}

function onDelete(event) {
  const bookmarkItem = event.target.closest(".bookmark");
  const idToRemove = bookmarkItem.getAttribute("bookmark-id");
  bookmarkItem.remove();
  chrome.runtime.sendMessage({ type: "DELETE_BOOKMARK", id: idToRemove });
}

const themeSwitch = document.getElementById("themeSwitch");

document.addEventListener("DOMContentLoaded", () => {

  chrome.storage.sync.get("theme", (data) => {
    if (data.theme === "dark") {
      document.body.classList.add("dark");
      themeSwitch.checked = true;
    }
  });

  // Toggle theme
  themeSwitch.addEventListener("change", () => {
    if (themeSwitch.checked) {
      document.body.classList.add("dark");
      chrome.storage.sync.set({ theme: "dark" });
    } else {
      document.body.classList.remove("dark");
      chrome.storage.sync.set({ theme: "light" });
    }
  });
});

