const bookmarkImgURL = chrome.runtime.getURL("assets/bookmark.png");
const observer = new MutationObserver(() => {
  addBookmarkButton();
});
observer.observe(document.body, { childList: true, subtree: true });
addBookmarkButton();

function onProblemsPage() {
  return window.location.pathname.includes("/problems/");
}

function addBookmarkButton() {
  if (!onProblemsPage() || document.getElementById("add-bookmark-button")) return;

  const bookmarkButton = document.createElement("img");
  bookmarkButton.id = "add-bookmark-button";
  bookmarkButton.src = bookmarkImgURL;
  bookmarkButton.style.cssText = "height:30px;width:30px;cursor:pointer;position:fixed;top:10px;right:10px;z-index:9999";
  document.body.appendChild(bookmarkButton);
  bookmarkButton.addEventListener("click", addNewBookmarkHandler);
}

function extractUniqueId(url) {
  const start = url.indexOf("problems/") + "problems/".length;
  const end = url.indexOf("?", start);
  return end === -1 ? url.substring(start) : url.substring(start, end);
}

async function addNewBookmarkHandler() {
    const algonProblemUrl = window.location.href;
    const uniqueId = extractUniqueId(algonProblemUrl);

    // Try to auto-detect title
    let problemName = document.querySelector(".Header_resource_heading__cpRp1")?.innerText || "Untitled Problem";

    // Prompt for custom name
    const customName = prompt("Enter a name for this problem:", problemName);
    if (customName !== null && customName.trim() !== "") {
        problemName = customName.trim();
    }

    const bookmarkObj = {
        id: uniqueId,
        name: problemName,
        url: algonProblemUrl
    };

    // Save and show confirmation
    chrome.runtime.sendMessage({ type: "ADD_BOOKMARK", bookmark: bookmarkObj }, (response) => {
        if (response.success) {
            alert("✅ Problem added to your bookmarks!");
        } else {
            alert("⚠️ This problem is already bookmarked.");
        }
    });
}


