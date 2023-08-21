function safeUpdate(elementId, block) {
  const element = document.getElementById(elementId)
  if (element) {
    block(element)
  }
}

function updatePageStats() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const site_data = JSON.parse(this.responseText);

      safeUpdate("lastupdate", function (element) {
        const date_obj = new Date(site_data.info.last_updated);

        element.innerHTML = `Last Updated: ${date_obj.getFullYear()}-${date_obj.getMonth() + 1}-${date_obj.getDate()}`;
      })

      safeUpdate("hitcount", function (element) {
        element.innerHTML = "You are Visitor #: " + site_data.info.views.toLocaleString();
      })
    }
  };
  xhttp.open("GET", "https://weirdscifi.ratiosemper.com/neocities.php?sitename=chasenet", true);
  xhttp.send();
}

document.addEventListener("DOMContentLoaded", updatePageStats)