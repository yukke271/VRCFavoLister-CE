document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("appMainButton").addEventListener("click", readJSON)
})

// 入力されたJSON形式のデータを読み込む
function readJSON() {
  const jsonText = document.getElementById("appMainInput").value
  // 入力されたデータが空の場合はNo dataと出力する
  if (jsonText.trim() === "") {
    alert(chrome.i18n.getMessage("etNoData"))
    return
  }

  // 入力されたデータをJSON形式に変換する
  let jsonList = null
  try {
    jsonList = JSON.parse(jsonText)
  } catch (error) {
    alert(chrome.i18n.getMessage("etJSONParseError"))
    return
  }

  // 正常なデータか確認する
  if (!Array.isArray(jsonList)) {
    alert(chrome.i18n.getMessage("etJSONParseError"))
    return
  }

  // 要らないデータを削除する
  let elements = ["id", "name", "thumbnailImageUrl", "unityPackages"]
  jsonList.forEach((json) => {
    Object.keys(json).forEach((key) => {
      if (!elements.includes(key)) {
        delete json[key]
      }
    })
    json.unityPackages.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if ("platform" !== key) {
          delete item[key]
        }
      })
    })
  })

  // データを保存する
  chrome.storage.local.set({ yukkeExtension_VRCFavoListerCE: jsonList }, function () {
    if (chrome.runtime.lastError) {
      alert(chrome.i18n.getMessage("etJSONSaveFailed"))
    }
  })

  // 通知
  console.log(jsonList)
}
