const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const axios = require('axios');

const app = express();
const PORT = 3000;

const GOOGLE_API_KEY = 'AIzaSyC0_QjeURgqq5F0W7UA87YU-hLZ647PSzU';

app.use(cors());
app.use(bodyParser.json());

// Подключение к PostgreSQL
const pool = new Pool({
  user: 'postgres',       // поменяй на своего пользователя
  host: 'localhost',
  database: 'postgres',   // имя твоей базы
  password: 'root',       // твой пароль
  port: 5432,
});

// Тестовый маршрут
app.get('/', (req, res) => {
  res.send('✅ Сервер работает');
});

// Прокси для кофеен
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

// Регистрация пользователя
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Все поля обязательны' });

  try {
    const { rows } = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, hashedPassword]
    );

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Логин пользователя
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Все поля обязательны' });

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }

    res.status(200).json({ message: 'Успешный вход', email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// GET: список пользователей (email и id)
app.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, email FROM users');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Обновить пароль по email
app.put('/users/password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email и новый пароль обязательны' });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2',
      [hashedPassword, email]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.status(200).json({ message: 'Пароль успешно обновлён' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});
// Отладочный маршрут для проверки кофеен по координатам (debug)
app.get('/debug-cafes', async (req, res) => {
  const { lat, lng } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'lat и lng обязательны' });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
    const params = {
      location: `${lat},${lng}`,
      radius: 1000,
      type: 'cafe',
      key: GOOGLE_API_KEY
    };

    const response = await axios.get(url, { params });
    console.log(response);
    
    const cafes = response.data.results;
    

    // Показываем названия и координаты
    const simplified = cafes.map((cafe, i) => ({
      number: i + 1,
      name: cafe.name,
      lat: cafe.geometry.location.lat,
      lng: cafe.geometry.location.lng,
      address: cafe.vicinity,
    }));

    res.json(simplified);
  } catch (err) {
    console.error('Ошибка в debug-cafes:', err.message);
    res.status(500).json({ error: 'Ошибка при получении кофеен' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Сервер запущен на http://0.0.0.0:${PORT}`);
});
