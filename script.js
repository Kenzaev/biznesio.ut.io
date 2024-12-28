async function loadProducts() {
    const response = await fetch('products.json');
    const products = await response.json();
    displayProducts(products);
}

function displayProducts(products) {
    const gallery = document.getElementById('product-gallery');
    gallery.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p>Цена: ${product.price}₽</p>
            <a href="${product.video}" target="_blank">Смотреть видео</a>
        `;
        gallery.appendChild(productDiv);
    });
}

// Загружаем продукты при загрузке страницы
loadProducts();
