let products = [];
let cart = [];
let totalPrice = 0;
let isAdminMode = false;

async function loadProducts() {
    const response = await fetch('products.json');
    products = await response.json();
    displayProducts();
}

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

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    totalPrice += product.price;
    updateCart();
}

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

function toggleAdmin() {
    isAdminMode = !isAdminMode;
    document.getElementById("admin-button").textContent = isAdminMode ? 'Выключить админ-режим' : 'Включить админ-режим';
    
    const productNames = document.querySelectorAll('.product-name');
    const productPrices = document.querySelectorAll('.product-price');

    if (isAdminMode) {
        productNames.forEach(name => {
            name.contentEditable = true;
            name.classList.add("admin-edit"); // Добавление визуального эффекта
            name.onblur = () => { 
                console.log(`Изменено название: ${name.textContent}`); 
            };
        });

        productPrices.forEach(price => {
            price.contentEditable = true;
            price.classList.add("admin-edit"); // Добавление визуального эффекта
            price.onblur = () => { 
                console.log(`Изменена цена: ${price.textContent}`); 
            };
        });
    } else {
        productNames.forEach(name => {
            name.contentEditable = false;
            name.classList.remove("admin-edit");
        });

        productPrices.forEach(price => {
            price.contentEditable = false;
            price.classList.remove("admin-edit");
        });
    }
}

// Инициализация загрузки продуктов
loadProducts();
