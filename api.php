<?php
// Параметры подключения к базе данных
$host = 'localhost'; // Хост
$db = 'my_website_db'; // Имя базы данных
$user = 'root'; // Имя пользователя
$pass = 'root'; // Пароль

// Подключение к базе данных
$conn = new mysqli($host, $user, $pass, $db);

// Проверка подключения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Проверка, была ли отправлена форма
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $video = $_POST['video'];
    $image = $_FILES['image'];

    // Проверка на ошибки загрузки изображения
    if ($image['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/'; // Папка для загрузки изображений
        $imagePath = $uploadDir . basename($image['name']);

        // Перемещение загруженного файла в папку
        if (move_uploaded_file($image['tmp_name'], $imagePath)) {
            // Получаем URL изображения
            $imageUrl = 'http://' . $_SERVER['HTTP_HOST'] . '/' . $imagePath;

            // SQL-запрос для вставки данных о товаре
            $stmt = $conn->prepare("INSERT INTO products (name, price, video, image_url) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("sdss", $name, $price, $video, $imageUrl);

            // Выполнение запроса
            if ($stmt->execute()) {
                echo json_encode(['status' => 'success', 'message' => 'Товар добавлен!']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Ошибка при добавлении товара: ' . $stmt->error]);
            }

            $stmt->close();
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Ошибка загрузки изображения.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Ошибка при загрузке файла.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Неверный метод запроса.']);
}

// Закрытие подключения к базе данных
$conn->close();
?>
