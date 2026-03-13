const express = require("express");
const cors = require("cors");
const Retell = require("retell-sdk").default;
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Initialize Retell client with API key from environment
const client = new Retell({
  apiKey: process.env.RETELL_API_KEY,
});

// Endpoint to create web call and get access token
app.post("/create-web-call", async (req, res) => {
  try {
    const agentId = req.body.agent_id || process.env.AGENT_ID;
    
    if (!agentId) {
      return res.status(400).json({ error: "agent_id is required" });
    }

    const webCallResponse = await client.call.createWebCall({
      agent_id: agentId,
    });

    res.json({
      access_token: webCallResponse.access_token,
      call_id: webCallResponse.call_id,
    });
  } catch (error) {
    console.error("Error creating web call:", error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
