const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Папка с вашим HTML и JS

// Получение продуктов
app.get('/products', (req, res) => {
    fs.readFile('products.json', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка чтения файла');
        }
        res.send(data);
    });
});

// Добавление продукта
app.post('/products', (req, res) => {
    fs.readFile('products.json', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка чтения файла');
        }
        const products = JSON.parse(data);
        products.push(req.body);
        fs.writeFile('products.json', JSON.stringify(products), (err) => {
            if (err) {
                return res.status(500).send('Ошибка записи файла');
            }
            res.send('Продукт добавлен');
        });
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
