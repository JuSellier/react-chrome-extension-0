// eslint-disable-next-line no-undef
chrome.runtime.onInstalled.addListener(function () {
  // eslint-disable-next-line no-undef
  chrome.runtime.openOptionsPage(() => console.log("options page opened"));
});
