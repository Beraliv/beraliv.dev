import type { VercelRequest, VercelResponse } from '@vercel/node';

interface OpenWeatherMapResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  name: string;
  sys: {
    country: string;
  };
}

const OPENWEATHER_API_KEY = process.env.VITE_OPENWEATHER_API_KEY || '';
const LATITUDE = process.env.VITE_WEATHER_LATITUDE || '51.49293147877204';
const LONGITUDE = process.env.VITE_WEATHER_LONGITUDE || '-0.224510753428542';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!OPENWEATHER_API_KEY || !LATITUDE || !LONGITUDE) {
      return res.status(500).json({ error: `Weather API credentials not configured` });
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`OpenWeatherMap API error: ${response.status}`);
    }

    const data: OpenWeatherMapResponse = await response.json();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json({
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      location: `${data.name}, ${data.sys.country}`,
    });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}