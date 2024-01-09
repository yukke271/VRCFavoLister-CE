document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("appName").textContent = chrome.i18n.getMessage("appName")
  document.getElementById("appMainTab").textContent = chrome.i18n.getMessage("extensionTextTabMain")
  document.getElementById("appSettingTab").textContent =
    chrome.i18n.getMessage("extensionTextTabSetting")
})
