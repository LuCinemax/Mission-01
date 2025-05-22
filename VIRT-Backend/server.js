require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

// Initialize Express app
const app = express();

// Use port defined in .env
const port = process.env.PORT;

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse raw binary data with a max limit of 20MB (required for Azure prediction)
app.use(express.raw({ type: "application/octet-stream", limit: "20mb" }));

// ========######## Prediction Endpoint ########======== //
app.post("/api/predict", async (req, res) => {
  try {
    // Build the Azure Custom Vision prediction URL dynamically using environment variables
    const url = `https://${process.env.AZURE_REGION}.api.cognitive.microsoft.com/customvision/v3.0/Prediction/${process.env.AZURE_PROJECT_ID}/classify/iterations/${process.env.AZURE_MODEL}/image`;
    console.log("Azure URL:", url);

    // Send binary image data to Azure Custom Vision API
    const response = await axios.post(url, req.body, {
      headers: {
        "Prediction-Key": process.env.AZURE_KEY,
        "Content-Type": "application/octet-stream",
      },
    });

    // Return prediction results to the frontend
    res.json(response.data);

    // Handle and log any errors
  } catch (error) {
    console.error("Prediction failed:", error.message);
    res.status(500).json({ error: "Prediction failed" });
  }
});

// ========######## Start Server ########======== //
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
