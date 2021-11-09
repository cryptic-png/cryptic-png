//receives message from background.js
console.log("-YT Current Video Url Loader is working")
let obj = {}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.permission === "copyVideoUrl") {
            function calculate() {
                let time = document.querySelector(".ytp-time-current").innerText
                let splittedTime = time.split(":")
                let no = splittedTime.length - 1
                if (no !== 2) {
                    splittedTime.unshift(0)
                }
                no = splittedTime.length - 1
                let hours = parseInt(splittedTime[no-2])
                let minutes = parseInt(splittedTime[no-1])
                let seconds = parseInt(splittedTime[no])
                seconds = seconds + minutes*60 + hours*3600
                console.log("reloading at " + seconds)
                return seconds
            }
            let seconds = calculate()
            //sends message to background.js
            obj["message"] = String(seconds)
            sendResponse(obj)
            let newUrl = request.url + "&t=" + String(seconds)
            window.open(newUrl, '_blank')
            window.close()
        }      
    }
  );
