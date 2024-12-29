const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Подключение к MongoDB (замените <dbname> на имя вашей базы данных)
mongoose.connect('mongodb://localhost:27017/<dbname>', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Создание схемы и модели для товара
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    video: String,
    image: String,
    isRecommended: Boolean,
});

const Product = mongoose.model('Product', productSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API для получения товаров
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// API для добавления товара
app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
});

// API для удаления товара
app.delete('/api/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
