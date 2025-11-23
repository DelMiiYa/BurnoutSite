async function handleDownload() {
  await increaseDownloadCount();

  sessionStorage.setItem("shouldDownload", "true");
  window.location.href = "/thank.html";
}

async function increaseDownloadCount() {
  let { data, error } = await supabase.rpc("increment_downloads");
  if (error) {
    console.error("Error incrementing download count:", error);
  } else {
    console.log("Download count increased:", data);
  }
}
