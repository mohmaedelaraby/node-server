const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;


app.use(cors());

// Fetch data from FRED API
async function fetchFredData( API_KEY,BASE_URL , seriesId) {
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
