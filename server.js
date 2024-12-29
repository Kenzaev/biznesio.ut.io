document.getElementById("add-button").addEventListener("click", addProduct);

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
                body: new URLSearchParams({ name, price, video, image: imageUrl })
            });
            const result = await response.json();
            console.log(result);
            if (result.status === 'success') {
                alert('Товар добавлен!');
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
