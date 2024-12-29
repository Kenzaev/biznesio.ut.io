const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'products.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Read products from file
function readProducts() {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
}

// Write products to file
function writeProducts(products) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf8');
}

// Remove expired products
function removeExpiredProducts() {
    const products = readProducts();
    const now = new Date().getTime();
    const updatedProducts = products.filter(product => {
        const expirationDate = new Date(product.expirationDate).getTime();
        return now < expirationDate;
    });
    writeProducts(updatedProducts);
}

// Routes
app.get('/api/products', (req, res) => {
    console.log('Received request to get products');
    removeExpiredProducts();
    const products = readProducts();
    res.json(products);
});

app.post('/api/products', (req, res) => {
    console.log('Received request to add product:', req.body);
    const products = readProducts();
    const newProduct = {
        id: Date.now().toString(),
        ...req.body,
        expirationDate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };
    products.push(newProduct);
    writeProducts(products);
    console.log('Product added:', newProduct);
    res.json(newProduct);
});

app.delete('/api/products/:id', (req, res) => {
    const products = readProducts();
    const productId = req.params.id;
    const updatedProducts = products.filter(product => product.id !== productId);
    writeProducts(updatedProducts);
    console.log('Product deleted with id:', productId);
    res.json({ message: 'Product deleted' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
