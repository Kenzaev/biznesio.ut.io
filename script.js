document.addEventListener('DOMContentLoaded', function() {
    const products = [
        {
            name: 'Котятки в виде носок',
            description: 'Милые носочки с котятками',
            price: '1000 руб.',
            image: 'https://via.placeholder.com/150'
        },
        {
            name: 'Котятки в виде носок',
            description: 'Милые носочки с котятками',
            price: '1000 руб.',
            image: 'https://via.placeholder.com/150'
        },
        {
            name: 'Котятки в виде носок',
            description: 'Милые носочки с котятками',
            price: '1000 руб.',
            image: 'https://via.placeholder.com/150'
        }
    ];

    const productList = document.getElementById('product-list');

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>${product.price}</p>
        `;
        productList.appendChild(productItem);
    });
});
