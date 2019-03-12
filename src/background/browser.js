import { getBookmarks } from './bookmarks'

chrome.browserAction.onClicked.addListener(function (tab) {
  window.open(`chrome-extension://${chrome.runtime.id}/index.html`)
})

chrome.runtime.onMessage.addListener(function (payload, sender, callback) {
  const { command, value } = payload
  if (command === 'getBookmarks') {
    getBookmarks(value).then(bookmarks => {
      callback(bookmarks.slice(0, 500))
    })
    return true
  }
})
