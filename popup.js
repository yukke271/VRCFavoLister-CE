document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.create({ url: 'extension.html' });
});