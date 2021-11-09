let calculateBtn = document.getElementById("calculate-btn")
obj = {}
let time = []
var inputEnd = document.getElementById("input-end")
var inputStart = document.getElementById("input-start")

inputStart.focus()

//for enter key
//first box
inputStart.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    inputEnd.focus()
  }
})

//second box
inputEnd.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    calculateBtn.click();
    inputStart.focus()
  }
})

calculateBtn.addEventListener("click", function() {
  //assigns serial numbers
  let startValue = document.getElementById("input-start").value
  let endValue = document.getElementById("input-end").value
  let placeHolderNumbers = [startValue, endValue]
  let msg = JSON.stringify(placeHolderNumbers)

  obj["message"] = msg

  function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){ //sends msg to content.js
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, obj, function(response) {  //sends & receives message from content.js
      time = JSON.parse(response.message)
      console.log(time)
      document.getElementById("time-para").innerHTML = speedConvert(time, 1)  //change in paragraph tag
      document.getElementById("time-para").addEventListener('mouseenter', function() {
        console.log('mouse entered')
        setUpToolTip()
      });
    });
   });
  }
  
  let setUpToolTip = function() {
    let toolTip = "",
      toolTipDiv = document.querySelector(".div-tooltip")
      toolTipElements = Array.from(document.querySelectorAll(".hover-reveal"));
    
    let displayTooltip = function(e, obje) {
      toolTip = "1.25x: " + speedConvert(time, 1.25) + "\n" + "1.50x: " + speedConvert(time, 1.50) + "\n" + "1.75x: " + speedConvert(time, 1.75) + "\n" + "2.00x: " + speedConvert(time, 2.00)
      toolTipDiv.innerHTML = toolTip
      toolTipDiv.style.top = (e.pageY - 50) + "px"
      toolTipDiv.style.left = e.pageX + "px"
      //toolTipDiv.style.opacity = 1
      fadeIn(toolTipDiv)
      
    }
    
    toolTipElements.forEach(function(elem) {
      elem.addEventListener("mouseenter", function(e) {
        displayTooltip(e, this);
      })
      elem.addEventListener("mouseleave", function(e) {
        fadeOut(toolTipDiv)
      })
    })
  } 

  function speedConvert(duration, speed) {
    duration = Math.floor(duration/speed)
    let hours = Math.floor(duration/3600)
    let minutes = Math.floor(duration/60) - hours*60
    let seconds = duration - hours*3600 - minutes*60
    let timeString = String(hours) + "h " + String(minutes) + "m " + String(seconds) + "s"
    return timeString
  }

  let fadeOut = function(element) {
    let op = 1 
    let timer = setInterval(function() {
      if (op <= 0.1) {
        clearInterval(timer);
        element.style.opacity = 0
        element.style.display = 'none'
      }
      element.style.opacity = op
      op -= op*0.1
    }, 10)
  }

  let fadeIn = function(element) {
    var op = 0.1
    element.style.display = 'block'
    var timer = setInterval(function () {
      if (op >= 1) {
        clearInterval(timer);
      }
      element.style.opacity = op
      op += op*0.1 
    }, 10)
  }

  popup() //sends msg to content.js
          //receives message from content.js
          //change in paragraph tag


  //clears input in popup
  document.getElementById("input-start").value = ""
  document.getElementById("input-end").value = "";
})
