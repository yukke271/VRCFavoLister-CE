// 表示スタイルをクライアントのダークモードに合わせる
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.classList.add("dark")
}

// デフォルトで非表示にする
document.getElementById("appSetting").style.display = "none"

// タブの表示切替
const tabs = document.querySelectorAll(".tabs a")
const tabContents = document.querySelectorAll("#appMain, #appSetting")
tabs.forEach((tab) => {
  tab.addEventListener("click", function (event) {
    event.preventDefault()

    // activeの切り替え
    tabs.forEach((tab) => {
      tab.classList.remove("active")
    })
    this.classList.add("active")

    // 表示中のコンテンツを非表示
    tabContents.forEach((content) => {
      content.style.display = "none"
    })

    // activeなタブに対応するコンテンツを表示
    const activeTabContent = document.querySelector(this.getAttribute("href"))
    activeTabContent.style.display = "block"
  })
})
