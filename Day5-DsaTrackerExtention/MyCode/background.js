const ALGON_PROBLEM_KEY = "ALGON_PROBLEM_KEY";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get([ALGON_PROBLEM_KEY], (data) => {
    if (!data[ALGON_PROBLEM_KEY]) {
      chrome.storage.sync.set({ [ALGON_PROBLEM_KEY]: [] });
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_BOOKMARKS") {
    chrome.storage.sync.get([ALGON_PROBLEM_KEY], (data) => {
      sendResponse({ bookmarks: data[ALGON_PROBLEM_KEY] || [] });
    });
    return true;
  }

  if (request.type === "ADD_BOOKMARK") {
    chrome.storage.sync.get([ALGON_PROBLEM_KEY], (data) => {
      const current = data[ALGON_PROBLEM_KEY] || [];
      const exists = current.some((item) => item.id === request.bookmark.id);
      if (exists) {
        sendResponse({ success: false, message: "Bookmark already exists" });
        return;
      }
      const updated = [...current, request.bookmark];
      chrome.storage.sync.set({ [ALGON_PROBLEM_KEY]: updated }, () => {
        sendResponse({ success: true, message: "Bookmark added" });
      });
    });
    return true;
  }

  if (request.type === "DELETE_BOOKMARK") {
    chrome.storage.sync.get([ALGON_PROBLEM_KEY], (data) => {
      const current = data[ALGON_PROBLEM_KEY] || [];
      const updated = current.filter((b) => b.id !== request.id);
      chrome.storage.sync.set({ [ALGON_PROBLEM_KEY]: updated }, () => {
        sendResponse({ success: true, message: "Bookmark deleted" });
      });
    });
    return true;
  }
});