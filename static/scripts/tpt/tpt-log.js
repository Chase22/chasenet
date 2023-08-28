window.tpt = {
  log: []
}

document.addEventListener("DOMContentLoaded", () => {
  const log = document.getElementById("tpt_log")
  const saveToBrowserCheck = document.getElementById("tpt_keep_log")
  const saveToBrowserError = document.getElementById("tpt_save_error")
  const clearLogButton = document.getElementById("tpt_clear_button")

  const blockedPromptsError = "You seem to have blocked prompts, this will cause the website to not function correctly. Please restart your browser"
  const noLocalStorageError = "You're browser does not support local storage or local storage is disabled. Saving data is not possible"

  const storageKey = "tpt_log"

  function init() {
    window.tpt.addDurationToLog = addDurationToLog
    window.tpt.saveLog = saveLog
    window.tpt.removeSavedLog = removeSavedLog

    if (!isLocalStorageAvailable()) {
      saveToBrowserError.innerText = noLocalStorageError
      saveToBrowserCheck.disabled = true
    } else {
      if (loadFromLocalStorage()) {
        renderLog()
      } else {
        removeSavedLog()
      }
      saveToBrowserCheck.addEventListener("change", onCheckedChanged)
      saveToBrowserCheck.checked = localStorage.getItem(storageKey) != null
    }
    clearLogButton.addEventListener("click", () => {
      if (confirm("This will clear the log and delete all data")) {
        if (isLocalStorageAvailable() && shouldSaveLog()) {
          localStorage.setItem(storageKey, "[]")
        }
        window.tpt.log = []
        renderLog()
      }
    })

  }

  /**
   * @param {number} startTime
   */
  function checkPromptsBlocked(startTime) {
    if (Date.now() - startTime < 10) {
      saveToBrowserError.innerText = blockedPromptsError
      saveToBrowserCheck.disabled = true
      clearLogButton.disabled = true
    } else {
      saveToBrowserError.innerText = ""
      saveToBrowserCheck.disabled = false
      clearLogButton.disabled = false
    }
  }

  function isLocalStorageAvailable(){
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch(e) {
      return false;
    }
  }

  /**
   * @param {HTMLElementEventMap[string]} event
   */
  function onCheckedChanged(event) {
    const startTime = Date.now()
    if (event.target.checked) {
      if (confirm("Activating this will save your log to your local browser. This information will never be send to a server")) {
        window.tpt.saveLog()
      } else {
        checkPromptsBlocked(startTime)
        saveToBrowserCheck.checked = false
      }
    } else {
      if (confirm("Deactivating this will delete all logs from your browser. They will be lost once you close this site")) {
        window.tpt.removeSavedLog()
      } else {
        checkPromptsBlocked(startTime)
        saveToBrowserCheck.checked = true
      }
    }
  }

  /**
   * @returns {boolean}
   */
  function shouldSaveLog() {
    return saveToBrowserCheck.checked
  }

  /**
   *
   * @returns {boolean}
   */
  function loadFromLocalStorage() {
    if (localStorage.getItem(storageKey)) {
      window.tpt.log = JSON.parse(localStorage.getItem(storageKey))
      return true
    } else {
      return false
    }
  }

  function removeSavedLog() {
    localStorage.removeItem(storageKey)
  }

  function saveLog() {
    localStorage.setItem(storageKey, JSON.stringify(window.tpt.log))
  }

  function addDurationToLog(runtime, duration) {
    window.tpt.log = [{
      timestamp: Date.now(),
      runtime: runtime,
      duration: duration
    }, ...window.tpt.log]

    if (shouldSaveLog()) {
      saveLog()
    }

    renderLog()
  }

  function pad(num) {
    num = num.toString()
    while (num.length < 2) {
      num = "0" + num
    }
    return num
  }

  function renderLog() {
    clearChildren(log)
    for (let logEntry of window.tpt.log.sort((a, b) => a.timestamp - b.timestamp)) {
      const div = document.createElement("div")
      const duration = logEntry.duration
      const prefix = duration.negative ? "-" : ""

      div.innerText = `${new Date(logEntry.timestamp).toLocaleString()} - ${logEntry.runtime}: ${prefix}${pad(duration.minutes)}:${pad(duration.seconds)}:${pad(duration.milliseconds)}`

      log.prepend(div)
    }
  }

  /**
   * @param {HTMLElement} node
   */
  function clearChildren(node) {
    while (node.firstChild) {
      node.lastChild.remove()
    }
  }

  init()
})