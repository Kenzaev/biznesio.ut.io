const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Статическая папка для загруженных изображений

// Настройка подключения к MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Замените на ваше имя пользователя
    password: 'root', // Замените на ваш пароль
    database: 'vbzx',
});

db.connect(err => {
    if (err) {
        console.error('Ошибка подключения к MySQL:', err);
        return;
    }
    console.log('MySQL подключен');
});

// Настройка загрузки файлов с помощью multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Добавить временную метку к имени файла
    },
});

const upload = multer({ storage });

// Получение всех продуктов
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Добавление нового продукта
app.post('/api/products', upload.single('image'), (req, res) => {
    const { name, price, video } = req.body;
    const image = req.file.path; // Путь к загруженному изображению

    db.query('INSERT INTO products (name, price, video, image) VALUES (?, ?, ?, ?)', 
    [name, price, video, image], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: results.insertId, name, price, video, image });
    });
});

// Удаление продукта
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.sendStatus(204);
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
