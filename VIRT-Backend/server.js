require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.raw({type: 'application/octet-stream', limit: '20mb'}));

app.post('/api/predict', async (req, res) => {
    try {
        const url = `https://${process.env.AZURE_REGION}.api.cognitive.microsoft.com/customvision/v3.0/Prediction/${process.env.AZURE_PROJECT_ID}/classify/iterations/${process.env.AZURE_MODEL}/image`;
        console.log('Azure URL:', url);

        const response = await axios.post(
            url,
            req.body,
            {
                headers: {
                    'Prediction-Key': process.env.AZURE_KEY,
                    'Content-Type': 'application/octet-stream',
                },
            }
        );

        res.json(response.data);
  } catch (error) {
    console.error('Prediction failed:', error.message);
    res.status(500).json({ error: 'Prediction failed' });
    }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});