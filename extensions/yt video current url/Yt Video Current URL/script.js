//redundant
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
    console.log(seconds)
    return seconds
}
calculate()
//send seconds to background.js
