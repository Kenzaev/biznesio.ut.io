document.addEventListener('DOMContentLoaded', function() {
    const products = [
        {
            name: 'Котятки в виде носок',
            description: 'Милые носочки с котятками',
            price: '1000 руб.',
            image: 'https://via.placeholder.com/150',
            review: 'Эти носочки очень удобные и теплые, идеально подходят для холодных дней.'
        },
        {
            name: 'Котятки в виде носок',
            description: 'Милые носочки с котятками',
            price: '1000 руб.',
            image: 'https://via.placeholder.com/150',
            review: 'Эти носочки очень удобные и теплые, идеально подходят для холодных дней.'
        },
        {
            name: 'Котятки в виде носок',
            description: 'Милые носочки с котятками',
            price: '1000 руб.',
            image: 'https://via.placeholder.com/150',
            review: 'Эти носочки очень удобные и теплые, идеально подходят для холодных дней.'
        }
    ];

    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartLink = document.getElementById('cart-link');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const cartSection = document.getElementById('cart');
    const checkoutSection = document.getElementById('checkout');
    const reviewModal = document.getElementById('review-modal');
    const reviewContent = document.getElementById('review-content');
    const reviewText = document.getElementById('review-text');
    const closeReview = document.getElementById('close-review');

    let cart = [];

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>${product.price}</p>
            <button onclick="addToCart('${product.name}', '${product.price}')">Купить сейчас</button>
            <button class="review-btn" onclick="showReview('${product.review}')">Обзор</button>
        `;
        productList.appendChild(productItem);
    });

    window.addToCart = function(name, price) {
        cart.push({ name, price });
        updateCart();
        alert(`${name} добавлен в корзину!`);
    };

    window.showReview = function(review) {
        reviewText.textContent = review;
        reviewModal.style.display = 'flex';
    };

    closeReview.addEventListener('click', function() {
        reviewModal.style.display = 'none';
    });

    function updateCart() {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `
                <p>${item.name} - ${item.price}</p>
            `;
            cartItems.appendChild(cartItem);
        });
        cartCount.textContent = cart.length;
    }

    cartLink.addEventListener('click', function(event) {
        event.preventDefault();
        cartSection.style.display = 'block';
        checkoutSection.style.display = 'none';
    });

    checkoutBtn.addEventListener('click', function() {
        cartSection.style.display = 'none';
        checkoutSection.style.display = 'block';
    });

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Заказ успешно оформлен!');
        cart = [];
        updateCart();
        checkoutSection.style.display = 'none';
    });
});
