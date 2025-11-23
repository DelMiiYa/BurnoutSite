function checkAndDownload() {
  if (
    document.referrer.includes("download") ||
    sessionStorage.getItem("shouldDownload")
  ) {
    sessionStorage.removeItem("shouldDownload");
    setTimeout(function () {
      const link = document.createElement("a");
      link.href = "app/BurningUp.apk";
      link.download = "BurningUp.apk";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 300);
  }
}

window.addEventListener("load", checkAndDownload);
