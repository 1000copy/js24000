function copyTitleURL() {
  chrome.tabs.getSelected(null, function(tab) {
    copyToClipboard( "["+tab.title + "](" + tab.url +")");    
  });
}
function copyToClipboard(str) {
    var obj=document.getElementById("clipboard");
    if( obj ) {
        obj.value = str;
        obj.select();
        document.execCommand("copy", false, null);
    }
}
var title="Copy [Title](URL)"
var parent = chrome.contextMenus.create({"title": title,"onclick": copyTitleURL});
chrome.commands.onCommand.addListener(function(command) {
	 if("Run" === command){
	 	copyTitleURL()
	 }
});