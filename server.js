// Функция для получения продуктов из API
async function fetchProducts() {
    const response = await fetch('api.php');
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
            const image = event.target.result; // здесь вам нужно будет загрузить изображение на сервер и получить URL
            const response = await fetch('api.php', {
                method: 'POST',
                body: new URLSearchParams({ name, price, video, image })
            });
            const result = await response.json();
            if (result.status === 'success') {
                alert('Товар добавлен!');
                displayProducts();
            }
        };
        reader.readAsDataURL(imageFile);
    } else {
        alert('Пожалуйста, заполните все поля и выберите изображение');
    }
}

// Инициализация отображения продуктов
displayProducts();
