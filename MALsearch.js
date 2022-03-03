function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

browser.contextMenus.create({
    id: "mal-search",
    title: "Search on MAL",
    icons: {
      "16": "icons/malsearch-16.png",
      "32": "icons/malsearch-32.png",
      "48": "icons/malsearch-48.png",
      "64": "icons/malsearch-64.png"
    },
    contexts: ["selection"]
  }, onCreated);

  browser.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "mal-search") {
      const searchQuery = info.selectionText.trim()
      if (searchQuery.length < 3) {
        showErrorMsg();
        return;
      }
        browser.tabs.create({ 'active': true, 'url': `https://myanimelist.net/anime.php?q=${searchQuery}`/*, 'index': tab.index+1*/ });
    }
  });

function showErrorMsg() {
  browser.notifications.create('mal-search-notification', {
    "type": "basic",
    "title": "Selection too short!",
    "message": "Selection must be 3 or more characters!"
  });
  setTimeout(() => {
    browser.notifications.clear('mal-search-notification');
  }, 5000);
}