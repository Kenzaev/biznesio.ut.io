let products = [];
let cart = [];
let totalPrice = 0;
let isAdminMode = false;

// Функция загрузки товаров из JSON
async function loadProducts() {
    const response = await fetch('products.json');
    products = await response.json();
    displayProducts();
}

// Функция отображения товаров
function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ''; // очищаем перед отображением
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <h3 class="product-name" contenteditable="false">${product.name}</h3>
            <p class="product-price" contenteditable="false">${product.price} рублей</p>
            <img src="${product.image}" alt="${product.name}" class="product-image" style="width: 150px; height: 150px;">
            <button onclick="addToCart(${product.id})">Добавить в корзину</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Логика добавления в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    totalPrice += product.price;
    updateCart();
}

// Обновление корзины
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement("li");
        cartItem.textContent = `${item.name} - ${item.price} рублей`;
        cartItems.appendChild(cartItem);
    });
    
    document.getElementById("total-price").textContent = `Итого: ${totalPrice} рублей`;
}

// Включение/выключение админ-режима
function toggleAdmin() {
    isAdminMode = !isAdminMode;
    document.getElementById("admin-button").textContent = isAdminMode ? 'Выключить админ-режим' : 'Включить админ-режим';
    
    if (isAdminMode) {
        enableEditing();
    } else {
        disableEditing();
    }
}

// Включение редактирования
function enableEditing() {
    const productNames = document.querySelectorAll('.product-name');
    const productPrices = document.querySelectorAll('.product-price');

    productNames.forEach(name => {
        name.contentEditable = true;
        name.onblur = () => { console.log(`Изменено название: ${name.textContent}`); };
    });

    productPrices.forEach(price => {
        price.contentEditable = true;
        price.onblur = () => { console.log(`Изменена цена: ${price.textContent}`); };
    });
}

// Отключение редактирования
function disableEditing() {
    const productNames = document.querySelectorAll('.product-name');
    const productPrices = document.querySelectorAll('.product-price');

    productNames.forEach(name => {
        name.contentEditable = false;
    });

    productPrices.forEach(price => {
        price.contentEditable = false;
    });
}

// Загрузить фоновое изображение
function uploadBackgroundImage() {
    const imageUrl = prompt("Введите URL фонового изображения:");
    if (imageUrl) {
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundSize = 'cover';
    }
}

// Инициализация загрузки продуктов
loadProducts();
