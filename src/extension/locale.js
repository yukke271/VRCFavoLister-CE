document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("appName").textContent = chrome.i18n.getMessage("appName")
  document.getElementById("appMainTab").textContent = chrome.i18n.getMessage("etTabMain")
  document.getElementById("appSettingTab").textContent = chrome.i18n.getMessage("etTabSetting")
  document.getElementById("appMainButton").textContent = chrome.i18n.getMessage("etAppMainButton")
  document.getElementById("appExportJSONButton").textContent =
    chrome.i18n.getMessage("etAppExportJSONButton")
})
