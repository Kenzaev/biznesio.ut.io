<?php
$servername = "localhost";
$username = "root";
$password = "root"; // Замените на ваш пароль
$dbname = "my_website_db";

// Создание соединения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
