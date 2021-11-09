function calculate(starting_video_number = 1, ending_video_number = document.querySelectorAll("ytd-thumbnail-overlay-time-status-renderer span").length) {

    let elements = document.querySelectorAll("ytd-thumbnail-overlay-time-status-renderer span");
    let seconds = 0
    let minutes = 0 
    let hours = 0
    unwantedCharacters = ['\n', ' ']
    let no = 0
    times = []
    for (let i = 0; i < elements.length; i++) {
      times[i] = elements[i].innerText
    }
  
    for (let i = starting_video_number - 1; i < ending_video_number; i++) {  //for each element
      let timeArray = times[i].split(':');
      no = timeArray.length - 1
      for (let j = 0; j < timeArray.length; j++) {  //for each time unit
        for (let k = 0; k < unwantedCharacters.length; k++) {
          timeArray[j] = timeArray[j].replaceAll(unwantedCharacters[k], '')
        }
      }
      if (no !== 2) {
        timeArray.unshift(0)
      }
      no = timeArray.length - 1
      hours = hours + parseInt(timeArray[no - 2]) 
      minutes = minutes + parseInt(timeArray[no - 1])
      seconds = seconds + parseInt(timeArray[no])
  
        //console.log([parseInt(timeArray[no - 2]), parseInt(timeArray[no - 1]), parseInt(timeArray[no])])
    }
  
    // hours = hours + Math.floor((minutes + Math.floor(seconds / 60)) / 60)
    // minutes = (minutes + Math.floor(seconds / 60)) % 60
    // seconds = seconds % 60

    seconds = hours*3600 + minutes*60 + seconds
    //return(String(hours)+'h '+String(minutes)+'m '+String(seconds)+'s')
    return seconds
}

console.log("This is a youtube playlist.")
obj = {}

//receives message from popup
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        placeHolderNumbers = JSON.parse(request.message)
        let startValue = placeHolderNumbers[0]
        let endValue = placeHolderNumbers[1]
        if (startValue === '') {
          startValue = "1"
        }
        if (endValue === '') {
          endValue = String(document.querySelectorAll("ytd-thumbnail-overlay-time-status-renderer span").length)
        }
        console.log(calculate(parseInt(startValue), parseInt(endValue)))

        //sends message to popup
        obj["message"] = JSON.stringify(calculate(parseInt(startValue), parseInt(endValue)))
        sendResponse(obj)
    }
  );

