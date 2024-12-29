document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("add-button").addEventListener("click", addProduct);
});

let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentProduct = null;
let currentQuantity = 1;
let isAdmin = false;

// Функция для получения продуктов из API
async function fetchProducts() {
    try {
        const response = await fetch('api.php'); // Замените на ваш API
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetching products failed:', error);
        return [];
    }
}

// Функция для отображения продуктов
async function displayProducts() {
    products = await fetchProducts();
    const productsDiv = document.getElementById("product-gallery");
    productsDiv.innerHTML = '';
    products.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product-card";
        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}" width="100" onerror="this.onerror=null;this.src='https://via.placeholder.com/150';">
            <p>Цена: ${product.price}₽</p>
            <button class="btn" onclick="orderNow('${product.name}')">Заказать сейчас</button>
            <button class="btn" onclick="addToCart('${product.name}', ${product.price})">В корзину</button>
            <button class="btn" onclick="viewVideo('${product.video}')">Обзор</button>
            \${isAdmin ? `<button class="btn" onclick="deleteProduct(${index})">Удалить</button>` : ''}
        `;
        productDiv.addEventListener('click', () => openModal(product));
        productsDiv.appendChild(productDiv);
    });
}

// Функция для добавления продукта через API
async function addProduct() {
    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const video = document.getElementById("product-video").value;
    const imageFile = document.getElementById("product-image").files[0];

    if (name && price && video && imageFile) {
        const reader = new FileReader();
        reader.onload = async function(event) {
            const imageBase64 = event.target.result; // Получаем изображение в формате base64

            // Здесь вам нужно будет загрузить изображение на сервер и получить URL
            const imageUrl = await uploadImage(imageBase64); // Функция для загрузки изображения

            // Теперь добавляем товар в базу данных с URL изображен
