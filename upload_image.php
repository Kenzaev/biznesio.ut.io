<?php
// upload_image.php

header('Content-Type: application/json');

$imageBase64 = $_POST['image'];

// Здесь вы можете сохранить изображение на сервере и получить URL
$imageData = base64_decode($imageBase64);
$imageName = uniqid() . '.png';
$imagePath = 'uploads/' . $imageName;
file_put_contents($imagePath, $imageData);

$imageUrl = 'http://yourdomain.com/uploads/' . $imageName;

echo json_encode(['imageUrl' => $imageUrl]);
?>

