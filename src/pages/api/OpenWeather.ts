import type { NextApiRequest, NextApiResponse } from 'next';

const OPEN_WEATHER_API_KEY = process.env.API_KEY;
const OPEN_WEATHER_API_URL =
  'https://api.openweathermap.org/data/2.5';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!OPEN_WEATHER_API_KEY) {
    return res
      .status(500)
      .json({ error: 'OpenWeather API Key not found' });
  }

  try {
    const { method, query } = req;

    if (method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { searchTerm } = query;

    if (!searchTerm) {
      return res
        .status(400)
        .json({ error: 'Missing search term parameter' });
    }

    const response = await fetch(
      `${OPEN_WEATHER_API_URL}/weather?q=${searchTerm}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
