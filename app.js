const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;


app.use(cors());
// Replace with your actual FRED API key
const API_KEY = 'b5012636c81dde3475ff4c99dba14ec9';
const BASE_URL = 'https://api.stlouisfed.org/fred/series/observations';

// Fetch data from FRED API
async function fetchFredData(seriesId) {
  try {
    const url = `${BASE_URL}?series_id=${seriesId}&api_key=${API_KEY}&file_type=json`;
    const response = await axios.get(url);
    return response.data.observations;
  } catch (error) {
    console.error('Error fetching data from FRED:', error);
    throw new Error('Failed to fetch data from FRED');
  }
}

// Create an endpoint that fetches data for a given series
app.get('/fred-data/:seriesId', async (req, res) => {
  const seriesId = req.params.seriesId;
  try {
    const data = await fetchFredData(seriesId);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
