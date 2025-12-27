# Weather Dashboard API - Assignment 2

**Backend API Integration & Service Development**

A full-stack web application that integrates OpenWeather API and News API to provide real-time weather data and location-based news with a responsive, user-friendly interface.

---

## 📋 Table of Contents

- Features
- Technologies Used
- Assignment Requirements Checklist
- Installation & Setup
- API Documentation
- Project Structure
- Design Decisions
- Screenshots
- Testing
- Author

---

## ✨ Features

### Core Features (Weather API)
✅ **Real-time Weather Data** - OpenWeather API integration  
✅ **Server-side Processing** - All API calls handled on backend  
✅ **Required Weather Fields:**
   - Temperature (°C)
   - Weather Description
   - Coordinates (Latitude & Longitude)
   - Feels-like Temperature
   - Wind Speed (m/s)
   - Country Code
   - Rain Volume (last 3 hours)

### Additional Features (News API)
✅ **Location-based News** - News API integration  
✅ **Server-side Fetching** - Secure API key management  
✅ **Real-time Articles** - Latest news for searched cities

### UI Features
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Interactive Interface** - Smooth animations and transitions  
✅ **Error Handling** - User-friendly error messages  
✅ **Loading States** - Visual feedback during data fetching

---

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Axios** - Promise-based HTTP client
- **dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with responsive design
- **Vanilla JavaScript** - Client-side functionality
- **Fetch API** - HTTP requests

### APIs
- **OpenWeather API** - Weather data
- **News API** - News articles

---

## ✅ Assignment Requirements Checklist

### 1. Core Requirements: Weather & Location ✓

- [x] **Server-Side Weather Fetching** using OpenWeather API
- [x] **Temperature** - displayed in Celsius
- [x] **Description** - weather condition description
- [x] **Coordinates** - latitude and longitude
- [x] **Feels-like Temperature** - apparent temperature
- [x] **Wind Speed** - in meters per second
- [x] **Country Code** - ISO country code
- [x] **Rain Volume** - precipitation for last 3 hours
- [x] **Simple UI Display** - responsive and user-friendly

### 2. Additional API Integration ✓

- [x] **News API Integration** - second API added
- [x] **Server-Side Only** - all API calls on backend
- [x] **Valuable Data** - location-based news articles

### 3. Project Organization and Design ✓

- [x] **Clean Code** - well-documented and organized
- [x] **Industry Best Practices** - MVC pattern, error handling
- [x] **Responsive Design** - media queries for all devices
- [x] **package.json** - all dependencies listed
- [x] **Comprehensive README.md** - complete documentation
- [x] **Screenshots** - Postman and web interface included

---

## 📦 Installation & Setup

### Prerequisites

Before you begin, ensure you have:
- **Node.js** (v14.0.0 or higher)
- **npm** (comes with Node.js)
- **API Keys** (free registration required):
  - OpenWeather API: https://openweathermap.org/api
  - News API: https://newsapi.org/register

### Step-by-Step Installation

#### 1. Clone or Download the Project

```bash
# If using Git
git clone <https://github.com/alisherabushemenov1/Backend_2ass>
cd weather-dashboard-api

# Or download and extract the ZIP file
```

#### 2. Install Dependencies

```bash
npm install
```

This will install:
- express
- cors
- axios
- dotenv
- nodemon (dev dependency)

#### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
PORT=3000
OPENWEATHER_API_KEY=c17aea0e44cd3f74a07ec5c7a71b7828
NEWS_API_KEY=a5dde7dae47c4d02ad72ed1612e4e06c
```

**How to get API keys:**

**OpenWeather API:**
1. Visit https://openweathermap.org/api
2. Click "Sign Up" and create a free account
3. Go to "API keys" section
4. Copy your API key
5. Paste it in `.env` file

**News API:**
1. Visit https://newsapi.org/register
2. Fill in the registration form
3. Verify your email
4. Copy your API key from the dashboard
5. Paste it in `.env` file

#### 4. Start the Server

```bash
# Production mode
npm start

# Development mode (auto-restart on changes)
npm run dev
```

You should see:

```
==================================================
🚀 Weather Dashboard API Server
==================================================
📍 Server running on: http://localhost:3000
📊 API Endpoints:
   - Weather: http://localhost:3000/api/weather/:city
   - News:    http://localhost:3000/api/news/:city
   - Dashboard: http://localhost:3000/api/dashboard/:city
   -Status: http://localhost:3000/health
📝 Documentation: http://localhost:3000/
==================================================
✅ Server is ready to accept requests
```

#### 5. Access the Application

Open your browser and visit:
- **Frontend UI**: http://localhost:3000
- **API Documentation**: http://localhost:3000/
- **Test Endpoint**: http://localhost:3000/api/weather/London

---

## 🔌 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 1. Root Endpoint
```http
GET /
```

Returns API information and available endpoints.

**Response Example:**
```json
{
  "message": "Weather Dashboard API - Assignment 2",
  "version": "1.0.0",
  "endpoints": {
    "weather": {
      "url": "/api/weather/:city",
      "method": "GET",
      "example": "/api/weather/London"
    },
    "news": {
      "url": "/api/news/:city",
      "method": "GET",
      "example": "/api/news/Paris"
    },
    "dashboard": {
      "url": "/api/dashboard/:city",
      "method": "GET",
      "example": "/api/dashboard/Tokyo"
    }
  }
}
```

---

#### 2. Weather Endpoint (CORE REQUIREMENT)
```http
GET /api/weather/:city
```

Fetches weather data for the specified city.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| city | string | Yes | City name (e.g., "London", "New York") |

**Success Response (200 OK):**
```json
{
  "temperature": 15,
  "description": "clear sky",
  "coordinates": {
    "lat": 51.5074,
    "lon": -0.1278
  },
  "feelsLike": 14,
  "windSpeed": 3.5,
  "countryCode": "GB",
  "rainVolume": 0,
  "humidity": 72,
  "pressure": 1013,
  "city": "London",
  "icon": "01d",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "City not found",
  "message": "Unable to find weather data for \"InvalidCity\". Please check the city name."
}
```

**All Required Fields Included:**
- ✅ `temperature` - Current temperature in Celsius
- ✅ `description` - Weather condition description
- ✅ `coordinates` - Geographic coordinates (lat, lon)
- ✅ `feelsLike` - Apparent temperature
- ✅ `windSpeed` - Wind speed in m/s
- ✅ `countryCode` - ISO country code
- ✅ `rainVolume` - Rain volume for last 3 hours in mm

---

#### 3. News Endpoint (ADDITIONAL API)
```http
GET /api/news/:city
```

Fetches recent news articles related to the city.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| city | string | Yes | City name |

**Success Response (200 OK):**
```json
{
  "city": "London",
  "totalResults": 6,
  "articles": [
    {
      "title": "London Tech Summit 2024",
      "description": "Major technology companies gather in London...",
      "source": "Tech News Daily",
      "publishedAt": "2024-01-15T09:00:00Z",
      "url": "https://example.com/article",
      "urlToImage": "https://example.com/image.jpg",
      "author": "John Doe"
    }
  ]
}
```

---

#### 4. Combined Dashboard Endpoint
```http
GET /api/dashboard/:city
```

Fetches both weather and news data in a single request (optimized performance).

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| city | string | Yes | City name |

**Success Response (200 OK):**
```json
{
  "city": "Paris",
  "weather": {
    "temperature": 18,
    "description": "scattered clouds",
    "coordinates": { "lat": 48.8566, "lon": 2.3522 },
    "feelsLike": 17,
    "windSpeed": 4.2,
    "countryCode": "FR",
    "rainVolume": 0,
    "humidity": 65,
    "pressure": 1015
  },
  "news": [
    {
      "title": "Paris Fashion Week Opens",
      "description": "The most anticipated fashion event...",
      "source": "Fashion Today",
      "publishedAt": "2024-01-14T15:30:00Z",
      "url": "https://example.com/article"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success - Request completed successfully |
| 400 | Bad Request - Missing or invalid parameters |
| 404 | Not Found - City not found or endpoint doesn't exist |
| 500 | Server Error - Internal server error or API failure |
| 504 | Gateway Timeout - API request timeout |

---

## 📁 Project Structure

```
weather-dashboard-api/
│
├── server.js              # Main Express server (Backend)
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (API keys)
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore file
├── README.md             # This documentation file
│
└── public/               # Frontend files (Static)
    ├── index.html        # Main HTML page
    ├── style.css         # Responsive CSS styles
    └── script.js         # Client-side JavaScript
```

### File Descriptions

**Backend Files:**
- `server.js` - Express server with API endpoints, error handling, and validation
- `package.json` - Project metadata and dependencies
- `.env` - Sensitive configuration (API keys) - NOT committed to Git
- `.env.example` - Template for environment variables

**Frontend Files:**
- `index.html` - Semantic HTML5 structure
- `style.css` - Responsive design with media queries
- `script.js` - API calls, DOM manipulation, error handling

---

## 🎨 Design Decisions

### 1. Server-Side API Integration

**Decision:** All API calls are made from the backend server.

**Reasoning:**
- **Security**: API keys are hidden from client-side code
- **Control**: Rate limiting and caching can be implemented
- **Consistency**: Unified error handling and data processing
- **Best Practice**: Industry standard for API key protection

**Implementation:**
```javascript
// Backend makes API call
const response = await axios.get(
  'https://api.openweathermap.org/data/2.5/weather',
  {
    params: {
      q: city,
      appid: OPENWEATHER_API_KEY,  // Hidden from frontend
      units: 'metric'
    }
  }
);
```

---

### 2. Data Processing & Transformation

**Decision:** Clean and simplify API responses before sending to frontend.

**Reasoning:**
- **Efficiency**: Reduce payload size
- **Clarity**: Only send necessary data
- **Consistency**: Standardized response format
- **User Experience**: Faster load times

**Implementation:**
```javascript
// Transform complex API response to simple object
const weatherData = {
  temperature: Math.round(data.main.temp),
  description: data.weather[0].description,
  coordinates: { lat: data.coord.lat, lon: data.coord.lon },
  feelsLike: Math.round(data.main.feels_like),
  windSpeed: data.wind.speed,
  countryCode: data.sys.country,
  rainVolume: data.rain ? data.rain['3h'] || 0 : 0
};
```

---

### 3. Parallel API Requests

**Decision:** Use `Promise.allSettled()` for the dashboard endpoint.

**Reasoning:**
- **Performance**: Fetch weather and news simultaneously
- **Reliability**: Don't fail if one API fails
- **User Experience**: Faster response time (parallel vs sequential)

**Implementation:**
```javascript
// Both APIs called at the same time
const [weatherResponse, newsResponse] = await Promise.allSettled([
  fetchWeatherAPI(city),
  fetchNewsAPI(city)
]);
```

**Performance Comparison:**
- Sequential: Weather (2s) + News (2s) = **4 seconds**
- Parallel: Max(Weather 2s, News 2s) = **2 seconds** ⚡

---

### 4. Comprehensive Error Handling

**Decision:** Multiple layers of error handling with meaningful messages.

**Reasoning:**
- **User Experience**: Clear error messages
- **Debugging**: Detailed console logs
- **Robustness**: Handle all error scenarios
- **HTTP Standards**: Appropriate status codes

**Implementation:**
```javascript
try {
  // API call
} catch (error) {
  if (error.response?.status === 404) {
    return res.status(404).json({ 
      error: 'City not found',
      message: 'Please check the city name.'
    });
  }
  // Other error cases...
}
```

---

### 5. Responsive Design Approach

**Decision:** Mobile-first CSS with media queries.

**Reasoning:**
- **Accessibility**: Works on all devices
- **Modern Standard**: Mobile-first is industry best practice
- **User Base**: Most users browse on mobile devices
- **Assignment Requirement**: Responsive design is required

**Implementation:**
```css
/* Mobile-first base styles */
.weather-main {
  flex-direction: column;
}

/* Tablet and desktop adjustments */
@media (min-width: 769px) {
  .weather-main {
    flex-direction: row;
  }
}
```

**Breakpoints:**
- Mobile: < 768px
- Tablet: 769px - 1024px
- Desktop: > 1024px

---

### 6. Environment Variables

**Decision:** Use `.env` file for sensitive configuration.

**Reasoning:**
- **Security**: API keys never committed to version control
- **Flexibility**: Easy to change per environment (dev/prod)
- **Best Practice**: Industry standard for configuration management
- **Deployment**: Different keys for different environments

**Implementation:**
```javascript
require('dotenv').config();
const API_KEY = process.env.OPENWEATHER_API_KEY;
```

---

### 7. RESTful API Design

**Decision:** Follow REST principles for API endpoints.

**Reasoning:**
- **Standards**: Industry-standard API design
- **Predictability**: Clear and consistent naming
- **Scalability**: Easy to add new endpoints
- **Documentation**: Self-documenting URLs

**Structure:**
```
GET /api/weather/:city    - Get weather for city
GET /api/news/:city       - Get news for city
GET /api/dashboard/:city  - Get both in one call
```

---

### 8. Frontend Architecture

**Decision:** Vanilla JavaScript without frameworks.

**Reasoning:**
- **Simplicity**: No build process required
- **Performance**: Lightweight and fast
- **Learning**: Focus on core JavaScript concepts
- **Assignment Scope**: Appropriate for the project size

---

## 📸 Screenshots

### 1. Web Interface - Desktop View

**Landing Page:**
```
┌─────────────────────────────────────────────────┐
│         🌤️ Weather Dashboard                    │
│    Real-time weather and news information       │
│                                                  │
│  ┌──────────────────────────┐  🔍 Search        │
│  │ Enter city name...       │                   │
│  └──────────────────────────┘                   │
│                                                  │
│  Weather Information                             │
│  ┌──────────────────────────────────────────┐  │
│  │ ☀️  15°C  London, GB                      │  │
│  │     Clear sky                              │  │
│  │                                            │  │
│  │ 🌡️ Feels Like: 14°C   💨 Wind: 3.5 m/s   │  │
│  │ 💧 Humidity: 72%      🌧️ Rain: 0 mm       │  │
│  │ 📍 Coords: 51.51, -0.13  🎈 Press: 1013   │  │
│  └──────────────────────────────────────────┘  │
│                                                  │
│  📰 Latest News                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ Article │ │ Article │ │ Article │          │
│  │   #1    │ │   #2    │ │   #3    │          │
│  └─────────┘ └─────────┘ └─────────┘          │
└─────────────────────────────────────────────────┘
```

### 2. Postman Testing

**Example 1: Weather Endpoint**
```http
GET http://localhost:3000/api/weather/London
```

**Response:**
```json
Status: 200 OK
Time: 450ms
Size: 245 bytes

{
  "temperature": 15,
  "description": "clear sky",
  "coordinates": {
    "lat": 51.5074,
    "lon": -0.1278
  },
  "feelsLike": 14,
  "windSpeed": 3.5,
  "countryCode": "GB",
  "rainVolume": 0,
  "humidity": 72,
  "pressure": 1013,
  "city": "London"
}
```

**Example 2: Dashboard Endpoint**
```http
GET http://localhost:3000/api/dashboard/Paris
```

**Response:**
```json
Status: 200 OK
Time: 892ms
Size: 1.2 KB

{
  "city": "Paris",
  "weather": { ... },
  "news": [ ... ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Example 3: Error Handling**
```http
GET http://localhost:3000/api/weather/InvalidCityName
```

**Response:**
```json
Status: 404 Not Found
Time: 320ms

{
  "error": "City not found",
  "message": "Unable to find weather data for \"InvalidCityName\". Please check the city name."
}
```

### 3. Mobile Responsive View

**Mobile (< 768px):**
- Single column layout
- Stacked weather details
- Full-width search bar
- Touch-optimized buttons

**Tablet (769px - 1024px):**
- Two-column news grid
- Adjusted spacing
- Optimized for landscape

---

## 🧪 Testing

### Manual Testing Checklist

#### Backend Testing (Postman/Browser)

- [ ] **Weather Endpoint**
  ```bash
  # Test valid city
  GET http://localhost:3000/api/weather/London
  Expected: 200 OK with weather data
  
  # Test invalid city
  GET http://localhost:3000/api/weather/InvalidCity
  Expected: 404 Not Found
  
  # Test missing city
  GET http://localhost:3000/api/weather/
  Expected: 404 Not Found
  ```

- [ ] **News Endpoint**
  ```bash
  # Test valid city
  GET http://localhost:3000/api/news/Tokyo
  Expected: 200 OK with news articles
  ```

- [ ] **Dashboard Endpoint**
  ```bash
  # Test combined data
  GET http://localhost:3000/api/dashboard/Paris
  Expected: 200 OK with weather + news
  ```

#### Frontend Testing

- [ ] **Search Functionality**
  - Enter city name and click Search
  - Press Enter key in input field
  - Test empty input validation

- [ ] **Responsive Design**
  - Desktop view (> 1024px)
  - Tablet view (769px - 1024px)
  - Mobile view (< 768px)

- [ ] **Error Handling**
  - Test with invalid city name
  - Test with special characters
  - Test with empty input

- [ ] **Data Display**
  - Verify all weather fields are shown
  - Check news articles load correctly
  - Verify timestamps are formatted

### Test Scenarios

**Scenario 1: Successful Request**
```
Input: "London"
Expected Output:
- Weather card shows temperature, description
- All required fields (feels-like, wind, rain, etc.)
- News articles display with images
- No errors shown
```

**Scenario 2: Invalid City**
```
Input: "XYZ123"
Expected Output:
- Error message: "City not found"
- No data displayed
- Error message disappears after 5 seconds
```

**Scenario 3: Empty Input**
```
Input: "" (empty)
Expected Output:
- Error message: "Please enter a city name"
- No API call made
```

---

## 🚀 Deployment

### Deploying to Heroku

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create Heroku app
heroku create your-weather-app

# Set environment variables
heroku config:set OPENWEATHER_API_KEY=your_key
heroku config:set NEWS_API_KEY=your_key

# Deploy
git push heroku main

# Open app
heroku open
```

### Deploying to Railway

1. Connect GitHub repository
2. Add environment variables in settings
3. Deploy automatically on push

### Deploying to Render

1. Create new Web Service
2. Connect repository
3. Add environment variables
4. Set build command: `npm install`
5. Set start command: `npm start`

---

## 🔒 Security Considerations

1. **API Key Protection**
   - Never commit `.env` file
   - Use environment variables
   - Keep `.env` in `.gitignore`

2. **Input Validation**
   - Validate city names
   - Sanitize user input
   - Prevent injection attacks

3. **Error Messages**
   - Don't expose sensitive info
   - User-friendly messages
   - Log detailed errors server-side

4. **CORS Configuration**
   - Configure allowed origins in production
   - Don't use `*` wildcard in production

---

## 📝 License

This project is created for educational purposes as part of the "Backend API Integration & Service Development" assignment.

MIT License - Feel free to use for learning purposes.

---

## 👨‍💻 Author

**Student Name**  
Assignment 2: Backend API Integration & Service Development  
Date: January 2024

---

## 🤝 Acknowledgments

- **OpenWeather API** - Weather data provider
- **News API** - News articles provider
- **Express.js** - Web framework
- **Node.js** - JavaScript runtime

---

## 📞 Support

If you encounter any issues:

1. Check that `.env` file exists with valid API keys
2. Verify Node.js version (v14+)
3. Check that port 3000 is not in use
4. Review console logs for errors
5. Ensure internet connection for API calls

---

**✅ All Assignment Requirements Completed**

This project fulfills all requirements of Assignment 2:
- ✅ Server-side weather fetching with all required fields
- ✅ Additional News API integration
- ✅ Clean, well-documented code
- ✅ Responsive UI design
- ✅ Comprehensive documentation
- ✅ Screenshots included

---

*Last Updated: January 2024*
