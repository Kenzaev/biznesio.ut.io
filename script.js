function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const video = document.getElementById('product-video').value;
    const image = document.getElementById('product-image').value;

    const newProductRef = database.ref('products').push();
    newProductRef.set({
        name: name,
        price: price,
        video: video,
        image: image
    });
}

// Функция для загрузки продуктов
function loadProducts() {
    const productsRef = database.ref('products');
    productsRef.on('value', (snapshot) => {
        const products = snapshot.val();
        displayProducts(products);
    });
}

// Функция для отображения продуктов
function displayProducts(products) {
    const gallery = document.getElementById('');
