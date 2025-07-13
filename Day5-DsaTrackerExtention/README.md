Welcome to Day 5 of your challenge!
Today, you’ll build your own Chrome Extension that allows bookmarking DSA problems from a coding platform like Algon Learning Platform (or any LeetCode-like site).


🎯 Goal:
Create a Chrome Extension that allows users to:
✅ Bookmark a DSA problem directly from the problem page
✅ View all saved bookmarks in a neat popup
✅ Open or delete any saved problem easily

📁 Folder Structure
bash
CopyEdit
day5-dsa-extension/
├── manifest.json
├── index.html          # Popup UI
├── popup.js            # Handles bookmarks UI logic
├── content.js          # Injected into problem pages
├── assets/             # Icons (bookmark, play, delete)
│   ├── bookmark.png
│   ├── play.png
│   └── delete.png
├── popup.css           # (Optional styling)
└── README.md


🧠 Concepts You'll Learn
How Chrome Extensions work (manifest, popup, content scripts)
Using chrome.storage.sync to persist data
DOM manipulation with JavaScript
Handling dynamic pages with MutationObserver
Working with browser APIs for tab and event management


🔧 Step-by-Step Instructions
1. Setup manifest.json
json
Copy
Edit
{
  "manifest_version": 3,
  "name": "DSA Problems To-Do",
  "version": "1.0",
  "description": "Bookmark your favorite DSA problems!",
  "permissions": ["storage", "activeTab", "scripting"],
  "action": {
    "default_popup": "index.html",
    "default_icon": "assets/bookmark.png"
  },
  "content_scripts": [
    {
      "matches": ["*://*/*"],
      "js": ["content.js"]
    }
  ],
  "icons": {
    "16": "assets/bookmark.png",
    "48": "assets/bookmark.png",
    "128": "assets/bookmark.png"
  }
}
2. Popup UI: index.html
This will act as your extension’s front-end UI.
You can optionally enhance it using CSS in popup.css.

3. Bookmarks Logic: popup.js
This script allows users to:

View all saved problems

Open a problem in a new tab

Delete a problem from bookmarks

Already implemented and functional.

4. Content Script: content.js
Injected into problem pages to:

Detect if the page is a DSA problem page

Add a floating bookmark icon dynamically

Save problem info to chrome.storage.sync

No changes needed.

✅ What You Should Do:
Set up the Chrome Extension

Create a folder and place all files inside

Load it as an Unpacked Extension using chrome://extensions/

Test the Extension

Go to Algon Learning Platform or any coding platform

Open a DSA problem

Click the bookmark icon to save it

View, open, or delete from the extension popup

Customize it (Optional)

Improve the UI

Add tag/category support

Add light/dark themes

