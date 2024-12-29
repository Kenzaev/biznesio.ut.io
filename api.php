<?php
// api.php

header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "root"; // Убедитесь, что пароль правильный
$dbname = "my_website_db";

// Создаем подключение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверяем подключение
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $video = $_POST['video'];
    $image = $_POST['image'];

    $stmt = $conn->prepare("INSERT INTO products (name, price, video, image) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sdss", $name, $price, $video, $image); // Исправлено на "sdss"

    if ($stmt->execute() === TRUE) {
        echo json_encode(["status" => "success", "message" => "Product added successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
    }

    $stmt->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM products";
    $result = $conn->query($sql);

    $products = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
    }

    echo json_encode($products);
}

$conn->close();
?>
