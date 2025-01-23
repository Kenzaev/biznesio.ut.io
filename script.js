let products = [];

async function loadProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error('Ошибка при загрузке товаров');
        }
        products = await response.json();
        displayProducts();
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
    }
}

function displayProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = ''; // Очищаем список товаров

    products.forEach((product, index) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product");
        productItem.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}" onclick="openModal(${index})">
            <h3>${product.name}</h3>
            <p>Цена: ${product.price}₽</p>
        `;
        productList.appendChild(productItem);
    });
}

function openModal(index) {
    const currentProduct = products[index];

    document.getElementById("modalProductName").innerText = currentProduct.name;
    document.getElementById("modalProductPrice").innerText = `Цена: ${currentProduct.price}₽`;

    const modalProductImages = document.getElementById("modalProductImages");
    modalProductImages.innerHTML = ''; // Очищаем перед добавлением

    currentProduct.images.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = currentProduct.name;
        modalProductImages.appendChild(img);
    });

    document.getElementById("productModal").style.display = "block";
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

// Загрузка товаров при старте
loadProducts();
