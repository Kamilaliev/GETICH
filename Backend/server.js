  const express = require('express');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const { Pool } = require('pg');
  const bcrypt = require('bcrypt');

  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(bodyParser.json());

  // Подключение к PostgreSQL
  const pool = new Pool({
    user: 'postgres',        // поменяй на своего пользователя
    host: 'localhost',
    database: 'postgres',   // имя твоей базы
    password: 'root',        // твой пароль
    port: 5432,
  });

  // Регистрация пользователя
  app.post('/signup', async (req, res) => {
    console.log();
    
    const { email, password} = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Все поля обязательны' });

    try {
      // Проверяем, есть ли пользователь с таким email
      const { rows } = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
      if (rows.length > 0) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
      }
      // Вставляем нового пользователя
      await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2)',
        [ email, password]
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
      // Находим пользователя по email
      const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (rows.length === 0) {
        return res.status(400).json({ message: 'Неверный email или пароль' });
      }

      const user = rows[0];

      // Проверяем пароль с помощью bcrypt
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Неверный email или пароль' });
      }

      // Возвращаем успех (можно добавить JWT токен сюда)
      res.status(200).json({ message: 'Успешный вход', email: user.email});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
  });
