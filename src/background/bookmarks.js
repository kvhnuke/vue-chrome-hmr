export function getBookmarks (query = '') {
  console.log('Loading:', query)
  return new Promise(function (resolve, reject) {
    chrome.bookmarks.search({ query: String(query || '') }, function (bookmarks) {
      resolve(bookmarks.slice(0, 500))
    })
  })
}
