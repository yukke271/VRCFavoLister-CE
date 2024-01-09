// Chrome拡張機能がインストールされたときに実行される
chrome.runtime.onInstalled.addListener(function (details) {
  // コンテキストメニューの追加
  const parent = chrome.contextMenus.create({
    id: "parent",
    title: chrome.i18n.getMessage("appName"),
    contexts: ["all"],
  })

  chrome.contextMenus.create({
    parentId: parent,
    title: chrome.i18n.getMessage("contextTitleViewExPage"),
    id: "ViewExPage",
    contexts: ["all"],
  })

  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    switch (info.menuItemId) {
      case "ViewExPage":
        chrome.tabs.create({ url: "./extension/extension.html" })
        break
    }
  })
})
