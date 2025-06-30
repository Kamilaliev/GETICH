const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

const GOOGLE_API_KEY = 'AIzaSyC0_QjeURgqq5F0W7UA87YU-hLZ647PSzU';

// Улучшенная настройка CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.get('/cafes', async (req, res) => {
  const { lat, lng } = req.query;
  console.log('Получен запрос /cafes с координатами:', lat, lng);

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Не заданы координаты lat и lng' });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=cafe&key=${GOOGLE_API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Ошибка Google Places API:', error.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Тестовый маршрут для проверки работы сервера
app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
