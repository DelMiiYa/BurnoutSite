async function loadDownloadCount() {
  try {
    const { data, error } = await supabase
      .from("downloads")
      .select("count")
      .single();

    if (error) {
      console.error("Error fetching download count:", error);
      document.getElementById("download-count").textContent = "0";
    } else {
      document.getElementById("download-count").textContent = data?.count || 0;
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    document.getElementById("download-count").textContent = "0";
  }
}

async function sendFeedback(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const comment = document.getElementById("comment").value;
  const feedbackMessage = document.getElementById("feedback-message");

  feedbackMessage.textContent = "";
  feedbackMessage.style.color = "";

  try {
    const { data, error } = await supabase.from("feedback").insert([
      {
        email: email,
        comment: comment,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Error sending feedback:", error);
      feedbackMessage.textContent =
        "Failed to send feedback. Please try again.";
      feedbackMessage.style.color = "#ff6b6b";
    } else {
      feedbackMessage.textContent =
        "Thank you! Your feedback has been sent successfully.";
      feedbackMessage.style.color = "#51cf66";

      document.getElementById("email").value = "";
      document.getElementById("comment").value = "";

      // Clear message after 4 seconds
      setTimeout(() => {
        feedbackMessage.textContent = "";
      }, 4000);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    feedbackMessage.textContent = "❌ An error occurred. Please try again.";
    feedbackMessage.style.color = "#ff6b6b";
  }
}

// Load download count on page load
window.addEventListener("load", loadDownloadCount);
