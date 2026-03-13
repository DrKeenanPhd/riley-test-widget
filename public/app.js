import { RetellWebClient } from "retell-client-js-sdk";

const retellWebClient = new RetellWebClient();

let isCalling = false;

// DOM elements
const callButton = document.getElementById("callButton");
const statusText = document.getElementById("status");
const transcriptDiv = document.getElementById("transcript");

// Event listeners for the SDK
retellWebClient.on("call_started", () => {
  console.log("Call started");
  updateStatus("Connected - Riley is listening...", "connected");
  isCalling = true;
  callButton.textContent = "End Call";
  callButton.classList.add("active");
});

retellWebClient.on("call_ended", () => {
  console.log("Call ended");
  updateStatus("Call ended", "idle");
  isCalling = false;
  callButton.textContent = "Start Call";
  callButton.classList.remove("active");
});

retellWebClient.on("agent_start_talking", () => {
  updateStatus("Riley is speaking...", "speaking");
});

retellWebClient.on("agent_stop_talking", () => {
  updateStatus("Riley is listening...", "connected");
});

retellWebClient.on("update", (update) => {
  if (update.transcript) {
    transcriptDiv.innerHTML = update.transcript
      .map(t => `<p><strong>${t.role === "agent" ? "Riley" : "You"}:</strong> ${t.content}</p>`)
      .join("");
    transcriptDiv.scrollTop = transcriptDiv.scrollHeight;
  }
});

retellWebClient.on("error", (error) => {
  console.error("Error:", error);
  updateStatus("Error: " + error.message, "error");
  isCalling = false;
  callButton.textContent = "Start Call";
  callButton.classList.remove("active");
});

function updateStatus(message, state) {
  statusText.textContent = message;
  statusText.className = "status " + state;
}

async function toggleCall() {
  if (isCalling) {
    retellWebClient.stopCall();
  } else {
    try {
      updateStatus("Connecting...", "connecting");
      callButton.disabled = true;

      // Call our backend to get access token
      const response = await fetch("/create-web-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Failed to create call");
      }

      const data = await response.json();

      if (data.access_token) {
        await retellWebClient.startCall({
          accessToken: data.access_token,
        });
      } else {
        throw new Error("No access token received");
      }
    } catch (error) {
      console.error("Error starting call:", error);
      updateStatus("Error: " + error.message, "error");
    } finally {
      callButton.disabled = false;
    }
  }
}

// Attach to window for HTML onclick
window.toggleCall = toggleCall;
