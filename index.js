// index.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/movies', async (req, res) => {
  const { genres } = req.query;

  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: process.env.TMDB_API_KEY,
        with_genres: genres,
        sort_by: 'popularity.desc',
      },
    });

    res.json(response.data.results.slice(0, 15));
  } catch (err) {
    console.error("TMDb error:", err.message);
    res.status(500).send("Error fetching movies");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
// GET weather by city name
app.get('/weather', async (req, res) => {
  const { city } = req.query;

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        units: 'metric',
        appid: process.env.WEATHER_API_KEY
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error("Weather (city) error:", err.message);
    res.status(500).send("Error fetching weather");
  }
});

// GET weather by coordinates (lat/lon)
app.get('/weather/coords', async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat,
        lon,
        units: 'metric',
        appid: process.env.WEATHER_API_KEY
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error("Weather (coords) error:", err.message);
    res.status(500).send("Error fetching weather by coordinates");
  }
});
app.get('/genres', async (req, res) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: 'en-US'
      }
    });
    res.json(response.data);
  } catch (err) {
    console.error("TMDb genre error:", err.message);
    res.status(500).send("Error fetching genres");
  }
});

