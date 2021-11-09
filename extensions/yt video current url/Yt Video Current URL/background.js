let obj = {}
let obj1 = {}
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        let url = tabs[0].url;
        let tabId = tabs[0].id
        console.log(tabId)
        let splittedUrl = url.split("&t")
        console.log(splittedUrl[0])

        //sending message to content.js to get seconds
        obj1["permission"] = "copyVideoUrl"
        obj1["url"] = splittedUrl[0]
        chrome.tabs.sendMessage(tabId, obj1, function(response) {  //sends & receives message from content.js
            //receiving
            let seconds = response.message
            let newUrl = splittedUrl[0] + "&t" + seconds
            obj["url"] = newUrl
            console.log("reloading at " + seconds)
            chrome.tabs.remove(tabId)
            //chrome.tabs.update(tabs[0].id, obj);  //updates url of the tab to the current time (new tab is opened in content.js)
        })  
    });
 });