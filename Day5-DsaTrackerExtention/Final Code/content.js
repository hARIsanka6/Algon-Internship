const bookmarkImgURL = chrome.runtime.getURL("assets/bookmark.png");
const ALGON_PROBLEM_KEY = "ALGON_PROBLEM_KEY";

const observer = new MutationObserver(() => {
    addBookmarkButton();
});

observer.observe(document.body, { childList: true, subtree: true });
addBookmarkButton();

function onProblemsPage() {
    return window.location.pathname.includes('/problems/');
}

function addBookmarkButton() {
    if (!onProblemsPage() || document.getElementById("add-bookmark-button")) return;

    const bookmarkButton = document.createElement('img');
    bookmarkButton.id = "add-bookmark-button";
    bookmarkButton.src = bookmarkImgURL;
    bookmarkButton.style.height = "30px";
    bookmarkButton.style.width = "30px";
    bookmarkButton.style.cursor = "pointer";

    const target = document.querySelector(".coding_ask_doubt_button__FjwXJ") || document.body;
    target.parentNode.insertAdjacentElement("afterend", bookmarkButton);

    bookmarkButton.addEventListener("click", addNewBookmarkHandler);
}

async function addNewBookmarkHandler() {
    const currentBookmarks = await getCurrentBookmarks();

    const algonProblemUrl = window.location.href;
    const uniqueId = extractUniqueId(algonProblemUrl);
    const problemName = document.querySelector(".Header_resource_heading__cpRp1")?.innerText || "Untitled Problem";

    if (currentBookmarks.some((bookmark) => bookmark.id === uniqueId)) return;

    const bookmarkObj = {
        id: uniqueId,
        name: problemName,
        url: algonProblemUrl
    };

    const updatedBookmarks = [...currentBookmarks, bookmarkObj];

    chrome.storage.sync.set({ ALGON_PROBLEM_KEY: updatedBookmarks }, () => {
        console.log("Updated the bookmarks to", updatedBookmarks);
    });
}

function extractUniqueId(url) {
    const start = url.indexOf("problems/") + "problems/".length;
    const end = url.indexOf("?", start);
    return end === -1 ? url.substring(start) : url.substring(start, end);
}

function getCurrentBookmarks() {
    return new Promise((resolve) => {
        chrome.storage.sync.get([ALGON_PROBLEM_KEY], (results) => {
            resolve(results[ALGON_PROBLEM_KEY] || []);
        });
    });
}