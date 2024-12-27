const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // Добавлено для обработки CORS

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Использование CORS для разрешения запросов с разных доменов

// Настройка подключения к базе данных
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'product_db'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Маршрут для получения всех продуктов
app.get('/api/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Маршрут для добавления нового продукта
app.post('/api/products', (req, res) => {
    const product = req.body;
    const sql = 'INSERT INTO products SET ?';
    db.query(sql, product, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Маршрут для удаления продукта
app.delete('/api/products/:id', (req, res) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
