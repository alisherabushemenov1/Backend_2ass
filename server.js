const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API Keys from environment variables
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Validation middleware
const validateCity = (req, res, next) => {
  const { city } = req.params;
  if (!city || city.trim() === '') {
    return res.status(400).json({ 
      error: 'City name is required',
      message: 'Please provide a valid city name'
    });
  }
  next();
};

// Root endpoint - API documentation
app.get('/', (req, res) => {
  res.json({ 
    message: 'Weather Dashboard API - Assignment 2',
    version: '1.0.0',
    description: 'Backend API for weather and news data',
    endpoints: {
      weather: {
        url: '/api/weather/:city',
        method: 'GET',
        description: 'Get weather data for a specific city',
        example: '/api/weather/London'
      },
      news: {
        url: '/api/news/:city',
        method: 'GET',
        description: 'Get news articles related to a city',
        example: '/api/news/Paris'
      },
      dashboard: {
        url: '/api/dashboard/:city',
        method: 'GET',
        description: 'Get both weather and news in one request',
        example: '/api/dashboard/Tokyo'
      }
    },
    author: 'Student Name',
    assignment: 'Backend API Integration & Service Development'
  });
});

// Weather API Endpoint - CORE REQUIREMENT
app.get('/api/weather/:city', validateCity, async (req, res) => {
  try {
    const { city } = req.params;
    
    console.log(`[Weather API] Fetching data for: ${city}`);

    // Call OpenWeather API (server-side only)
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: city,
          appid: OPENWEATHER_API_KEY,
          units: 'metric' // Celsius
        },
        timeout: 5000
      }
    );

    const data = response.data;

    // Process and return REQUIRED fields according to assignment
    const weatherData = {
      temperature: Math.round(data.main.temp), // Required
      description: data.weather[0].description, // Required
      coordinates: { // Required
        lat: data.coord.lat,
        lon: data.coord.lon
      },
      feelsLike: Math.round(data.main.feels_like), // Required (feels-like)
      windSpeed: data.wind.speed, // Required
      countryCode: data.sys.country, // Required
      rainVolume: data.rain ? (data.rain['3h'] || data.rain['1h'] || 0) : 0, // Required (last 3h)
      
      // Additional useful data
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      city: data.name,
      icon: data.weather[0].icon,
      timestamp: new Date().toISOString()
    };

    console.log(`[Weather API] Success for: ${city}`);
    res.json(weatherData);
    
  } catch (error) {
    console.error('[Weather API] Error:', error.message);
    
    if (error.response) {
      if (error.response.status === 404) {
        return res.status(404).json({ 
          error: 'City not found',
          message: `Unable to find weather data for "${req.params.city}". Please check the city name.`
        });
      }
      if (error.response.status === 401) {
        return res.status(500).json({ 
          error: 'API Configuration Error',
          message: 'Invalid API key. Please check server configuration.'
        });
      }
      return res.status(error.response.status).json({ 
        error: 'Weather API Error',
        message: 'Unable to fetch weather data at this time.'
      });
    }
    
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({
        error: 'Request Timeout',
        message: 'Weather service is taking too long to respond.'
      });
    }
    
    res.status(500).json({ 
      error: 'Server Error',
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
});

// News API Endpoint - ADDITIONAL API REQUIREMENT
app.get('/api/news/:city', validateCity, async (req, res) => {
  try {
    const { city } = req.params;
    
    console.log(`[News API] Fetching news for: ${city}`);

    // Call News API (server-side only)
    const response = await axios.get(
      'https://newsapi.org/v2/everything',
      {
        params: {
          q: city,
          sortBy: 'publishedAt',
          pageSize: 6,
          language: 'en',
          apiKey: NEWS_API_KEY
        },
        timeout: 5000
      }
    );

    // Process and clean the news data
    const articles = response.data.articles
      .filter(article => article.title && article.description)
      .map(article => ({
        title: article.title,
        description: article.description,
        source: article.source.name,
        publishedAt: article.publishedAt,
        url: article.url,
        urlToImage: article.urlToImage,
        author: article.author
      }));

    console.log(`[News API] Found ${articles.length} articles for: ${city}`);
    
    res.json({ 
      city: city,
      totalResults: articles.length,
      articles: articles
    });
    
  } catch (error) {
    console.error('[News API] Error:', error.message);
    
    if (error.response) {
      if (error.response.status === 401) {
        return res.status(500).json({ 
          error: 'API Configuration Error',
          message: 'Invalid News API key.'
        });
      }
      return res.status(error.response.status).json({ 
        error: 'News API Error',
        message: 'Unable to fetch news data at this time.'
      });
    }
    
    res.status(500).json({ 
      error: 'Server Error',
      message: 'An unexpected error occurred while fetching news.'
    });
  }
});

// Combined Dashboard Endpoint - Efficient data fetching
app.get('/api/dashboard/:city', validateCity, async (req, res) => {
  try {
    const { city } = req.params;
    
    console.log(`[Dashboard API] Fetching complete data for: ${city}`);

    // Parallel API calls for better performance
    const [weatherResponse, newsResponse] = await Promise.allSettled([
      axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: city,
          appid: OPENWEATHER_API_KEY,
          units: 'metric'
        },
        timeout: 5000
      }),
      axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: city,
          sortBy: 'publishedAt',
          pageSize: 6,
          language: 'en',
          apiKey: NEWS_API_KEY
        },
        timeout: 5000
      })
    ]);

    // Process weather data
    let weather = null;
    if (weatherResponse.status === 'fulfilled') {
      const data = weatherResponse.value.data;
      weather = {
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        coordinates: {
          lat: data.coord.lat,
          lon: data.coord.lon
        },
        feelsLike: Math.round(data.main.feels_like),
        windSpeed: data.wind.speed,
        countryCode: data.sys.country,
        rainVolume: data.rain ? (data.rain['3h'] || data.rain['1h'] || 0) : 0,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        city: data.name,
        icon: data.weather[0].icon
      };
    }

    // Process news data
    let news = [];
    if (newsResponse.status === 'fulfilled') {
      news = newsResponse.value.data.articles
        .filter(article => article.title && article.description)
        .map(article => ({
          title: article.title,
          description: article.description,
          source: article.source.name,
          publishedAt: article.publishedAt,
          url: article.url,
          urlToImage: article.urlToImage
        }));
    }

    // Return combined data
    const responseData = {
      city: city,
      weather: weather,
      news: news,
      timestamp: new Date().toISOString()
    };

    // Check if at least one API succeeded
    if (!weather && news.length === 0) {
      return res.status(404).json({
        error: 'No Data Available',
        message: `Unable to fetch data for "${city}". Please check the city name.`
      });
    }

    console.log(`[Dashboard API] Success for: ${city}`);
    res.json(responseData);
    
  } catch (error) {
    console.error('[Dashboard API] Error:', error.message);
    res.status(500).json({ 
      error: 'Server Error',
      message: 'Unable to fetch dashboard data.'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.url}`,
    availableEndpoints: [
      '/api/weather/:city',
      '/api/news/:city',
      '/api/dashboard/:city'
    ]
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: 'Something went wrong on the server.'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 Weather Dashboard API Server');
  console.log('='.repeat(50));
  console.log(`📍 Server running on: http://localhost:${PORT}`);
  console.log(`📊 API Endpoints:`);
  console.log(`   - Weather: http://localhost:${PORT}/api/weather/:city`);
  console.log(`   - News:    http://localhost:${PORT}/api/news/:city`);
  console.log(`   - Dashboard: http://localhost:${PORT}/api/dashboard/:city`);
  console.log(`📝 Documentation: http://localhost:${PORT}/`);
  console.log('='.repeat(50));
  console.log('✅ Server is ready to accept requests');
  console.log('');
});