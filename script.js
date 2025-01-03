// Пример товаров
const products = [
    { id: 1, name: "Товар 1", price: 100 },
    { id: 2, name: "Товар 2", price: 200 },
    { id: 3, name: "Товар 3", price: 300 },
];

// Переменные для корзины
let cart = [];
let totalPrice = 0;
let isAdminMode = false;

// Функция для отображения товаров
function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ''; // очищаем перед отображением
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${product.price} рублей</p>
            <button onclick="addToCart(${product.id})">Добавить в корзину</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Функция для добавления товара в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    totalPrice += product.price;
    updateCart();
}

// Функция для обновления корзины
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

// Функция для включения и выключения админ-режима
function toggleAdmin() {
    isAdminMode = !isAdminMode;
    document.getElementById("admin-button").textContent = isAdminMode ? 'Выключить админ-режим' : 'Включить админ-режим';
    document.body.classList.toggle("admin-edit", isAdminMode);

    if (isAdminMode) {
        enableEditing();
    } else {
        disableEditing();
    }
}

// Функция для включения редактирования
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

// Функция для отключения редактирования
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

// Запуск функции отображения товаров
displayProducts();
