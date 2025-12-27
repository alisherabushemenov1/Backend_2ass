// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const weatherSection = document.getElementById('weatherSection');
const newsSection = document.getElementById('newsSection');

// Weather Icon Mapping
const weatherIcons = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
};

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Initialize with default city
window.addEventListener('DOMContentLoaded', () => {
    fetchDashboardData('London');
});

// Main Search Handler
async function handleSearch() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    await fetchDashboardData(city);
}

// Fetch Dashboard Data (Weather + News)
async function fetchDashboardData(city) {
    showLoading();
    hideError();
    hideWeather();
    hideNews();
    
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard/${encodeURIComponent(city)}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch data');
        }
        
        const data = await response.json();
        
        // Display Weather Data
        if (data.weather) {
            displayWeather(data.weather);
        }
        
        // Display News Data
        if (data.news && data.news.length > 0) {
            displayNews(data.news, city);
        } else {
            // If no news, show message
            showNewsMessage('No recent news found for this city.');
        }
        
        hideLoading();
        
    } catch (err) {
        hideLoading();
        showError(err.message);
        console.error('Error fetching dashboard data:', err);
    }
}

// Display Weather Data
function displayWeather(weather) {
    // Update main weather info
    document.getElementById('temperature').textContent = weather.temperature;
    document.getElementById('cityName').textContent = weather.city;
    document.getElementById('description').textContent = weather.description;
    document.getElementById('countryCode').textContent = weather.countryCode;
    
    // Update weather icon
    const iconElement = document.getElementById('weatherIcon');
    iconElement.textContent = weatherIcons[weather.icon] || '🌤️';
    
    // Update weather details (ALL REQUIRED FIELDS)
    document.getElementById('feelsLike').textContent = `${weather.feelsLike}°C`;
    document.getElementById('windSpeed').textContent = `${weather.windSpeed} m/s`;
    document.getElementById('humidity').textContent = `${weather.humidity}%`;
    document.getElementById('rainVolume').textContent = `${weather.rainVolume} mm`;
    document.getElementById('coordinates').textContent = 
        `${weather.coordinates.lat.toFixed(2)}, ${weather.coordinates.lon.toFixed(2)}`;
    document.getElementById('pressure').textContent = `${weather.pressure} hPa`;
    
    // Show weather section
    weatherSection.classList.remove('hidden');
}

// Display News Data
function displayNews(articles, city) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';
    
    articles.forEach(article => {
        const newsCard = createNewsCard(article);
        newsContainer.appendChild(newsCard);
    });
    
    newsSection.classList.remove('hidden');
}

// Create News Card Element
function createNewsCard(article) {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.onclick = () => window.open(article.url, '_blank');
    
    // Format date
    const date = new Date(article.publishedAt);
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    
    // Create card HTML
    card.innerHTML = `
        ${article.urlToImage 
            ? `<img src="${article.urlToImage}" alt="${article.title}" class="news-image" 
                   onerror="this.parentElement.querySelector('.news-image-placeholder').style.display='flex'; this.style.display='none';">`
            : ''}
        <div class="news-image-placeholder" style="${article.urlToImage ? 'display:none;' : ''}">
            📰
        </div>
        <h3 class="news-title">${article.title}</h3>
        <p class="news-description">${article.description || 'No description available.'}</p>
        <div class="news-meta">
            <span class="news-source">${article.source}</span>
            <span class="news-date">${formattedDate}</span>
        </div>
    `;
    
    return card;
}

// Show News Message
function showNewsMessage(message) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: white; font-size: 1.2rem;">
            ${message}
        </div>
    `;
    newsSection.classList.remove('hidden');
}

// UI Helper Functions
function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    error.textContent = `❌ ${message}`;
    error.classList.remove('hidden');
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

function hideError() {
    error.classList.add('hidden');
}

function hideWeather() {
    weatherSection.classList.add('hidden');
}

function hideNews() {
    newsSection.classList.add('hidden');
}

// Console log for debugging
console.log('Weather Dashboard initialized');
console.log('API Base URL:', API_BASE_URL);