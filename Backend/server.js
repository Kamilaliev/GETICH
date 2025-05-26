const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Чтобы разрешить запросы с React Native (разрешить CORS)
app.use(cors());

// Для парсинга JSON тела
app.use(bodyParser.json());

// Пример "базы данных" — просто массив в памяти
const users = [];

// Роут для регистрации
app.post('/signup', (req, res) => {
  const { email, password, passwordConfirm } = req.body;

  // Простая валидация
  if (!email || !password || !passwordConfirm) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }
  if (password !== passwordConfirm) {
    return res.status(400).json({ message: 'Пароли не совпадают' });
  }

  // Проверка, есть ли уже такой email
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
  }

  // Сохраняем пользователя (в реальном мире — надо хешировать пароль!)
  users.push({ email, password });

  return res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
