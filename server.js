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
    const response = await fetch('api.php'); // Замените на ваш API
    const data = await response.json();
    return data;
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
            ${isAdmin ? `<button class="btn" onclick="deleteProduct(${index})">Удалить</button>` : ''}
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

            // Теперь добавляем товар в базу данных с URL изображения
            const response = await fetch('api.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ name, price, video, image: imageUrl })
            });
            const result = await response.json();
            console.log(result);
            if (result.status === 'success') {
                alert('Товар добавлен!');
                displayProducts();
            } else {
                alert('Ошибка при добавлении товара: ' + result.message);
            }
        };
        reader.readAsDataURL(imageFile);
    } else {
        alert('Пожалуйста, заполните все поля и выберите изображение');
    }
}

// Пример функции для загрузки изображения на сервер
async function uploadImage(imageBase64) {
    // Здесь вам нужно реализовать логику загрузки изображения на сервер
    // Например, вы можете использовать fetch для отправки base64 на сервер
    const response = await fetch('upload_image.php', {
        method: 'POST',
        body: JSON.stringify({ image: imageBase64 }),
        headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    return result.imageUrl; // Предполагаем, что сервер возвращает URL изображения
}

// Функция для открытия модального окна для ввода пароля
function openPasswordModal() {
    document.getElementById("passwordModal").style.display = "block";
}

// Функция для закрытия модального окна для ввода пароля
function closePasswordModal() {
    document.getElementById("passwordModal").style.display = "none";
}

// Функция для проверки пароля
function checkPassword() {
    const password = document.getElementById("admin-password").value;
    const correctPassword = "ваш_пароль"; // Замените на ваш пароль

    if (password === correctPassword) {
        isAdmin = true;
        document.getElementById("admin-panel").style.display = "block"; // Показываем админ-панель
        closePasswordModal();
        displayProducts(); // Обновляем список продуктов
    } else {
        alert("Неверный пароль!");
    }
}

// Функция для открытия модального окна продукта
function openModal(product) {
    currentProduct = product;
    currentQuantity = 1;
    document.getElementById("modalProductName").innerText = product.name;
    document.getElementById("modalProductImage").src = product.image;
    document.getElementById("modalProductPrice").innerText = `Цена: ${product.price}₽`;
    document.getElementById("modalProductQuantity").innerText = currentQuantity;
    document.getElementById("productModal").style.display = "block";
}

// Функция для закрытия модального окна продукта
function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

// Функция для увеличения количества
function increaseQuantity() {
    currentQuantity++;
    document.getElementById("modalProductQuantity").innerText = currentQuantity;
}

// Функция для уменьшения количества
function decreaseQuantity() {
    if (currentQuantity > 1) {
        currentQuantity--;
        document.getElementById("modalProductQuantity").innerText = currentQuantity;
    }
}

// Функция для добавления продукта в корзину из модального окна
function addToCartFromModal() {
    addToCart(currentProduct.name, currentProduct.price, currentQuantity);
    closeModal();
}

// Функция для добавления продукта в корзину
function addToCart(name, price, quantity = 1) {
    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${quantity} ${name}(ов) добавлено в корзину!`);
}

// Функция для оформления заказа
function checkout() {
    if (cart.length === 0) {
        alert("Ваша корзина пуста!");
        return;
    }
    // Логика оформления заказа
    alert("Заказ оформлен!");
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Функция для отображения корзины
function showCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = '';
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Ваша корзина пуста!</p>';
        return;
    }
    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>${item.price * item.quantity}₽</span>
            <button onclick="removeFromCart('${item.name}')">Удалить</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
}

// Функция для удаления товара из корзины
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    showCart();
}

// Инициализация отображения продуктов
displayProducts();
