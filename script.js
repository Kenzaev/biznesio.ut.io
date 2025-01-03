// Пример товаров
const products = [
    { id: 1, name: "Товар 1", price: 100 },
    { id: 2, name: "Товар 2", price: 200 },
    { id: 3, name: "Товар 3", price: 300 },
];

// Переменные для корзины
let cart = [];
let totalPrice = 0;

// Функция для отображения товаров
function displayProducts() {
    const productList = document.getElementById("product-list");
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.price} рублей</p>
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

// Запуск функции отображения товаров
displayProducts();

