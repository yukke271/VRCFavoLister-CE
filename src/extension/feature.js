document.addEventListener("DOMContentLoaded", function () {
  init()
  document.getElementById("appMainButton").addEventListener("click", readJSON)
})

function init() {
  // 保存されているデータを読み込む
  chrome.storage.local.get(["yukkeExtension_VRCFavoListerCE"], function (result) {
    if (chrome.runtime.lastError) {
      alert(chrome.i18n.getMessage("etJSONLoadFailed"))
      console.log(chrome.runtime.lastError)
      console.log(result.yukkeExtension_VRCFavoListerCE)
      return
    }

    // データを画面に配置する
    setList(result.yukkeExtension_VRCFavoListerCE)
  })
}

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

  // リストを画面に配置する
  setList(jsonList)

  // データを保存する
  saveJSON(jsonList)

  // 通知
  console.log(jsonList)
}

// json配列を既存のデータとの重複を排除して保存する
function saveJSON(jsonList) {
  // 保存されているデータを読み込む
  chrome.storage.local.get(["yukkeExtension_VRCFavoListerCE"], function (result) {
    if (chrome.runtime.lastError) {
      alert(chrome.i18n.getMessage("etJSONLoadFailed"))
      console.log(chrome.runtime.lastError)
      console.log(result.yukkeExtension_VRCFavoListerCE)
      return
    }

    // 重複を排除する
    result.yukkeExtension_VRCFavoListerCE.forEach((json) => {
      if (!jsonList.some((item) => item.id === json.id)) {
        jsonList.push(json)
      }
    })

    // 保存する
    chrome.storage.local.set({ yukkeExtension_VRCFavoListerCE: jsonList }, function () {
      if (chrome.runtime.lastError) {
        alert(chrome.i18n.getMessage("etJSONSaveFailed"))
        return
      }

      // 保存したら入力欄をクリアする
      document.getElementById("appMainInput").value = ""

      alert(chrome.i18n.getMessage("etJSONSaveSuccess"))
    })
  })
}

// json配列をリストで画面に配置する
function setList(jsonList) {
  // リストをクリアする
  document.getElementById("appMainList").innerHTML = ""

  // リストを作成する
  jsonList.forEach((json) => {
    const li = document.createElement("li")
    li.textContent = json.name
    document.getElementById("appMainList").appendChild(li)
  })
}
