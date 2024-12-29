<?php
$servername = "localhost";
$username = "root"; 
$password = "root"; 
$dbname = "my_website_db";

// Создание подключения
$conn = new mysqli($servername, $username, $password, $dbname);


// Проверяем соединение
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Получение всех продуктов
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM products");
    $products = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($products);
}

// Добавление нового продукта
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $video = $_POST['video'];
    $image = $_POST['image'];

    $stmt = $conn->prepare("INSERT INTO products (name, price, video, image) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sdss", $name, $price, $video, $image);
    $stmt->execute();
    $stmt->close();
    echo json_encode(['status' => 'success']);
}

$conn->close();
?>
