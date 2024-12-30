<?php
include 'db.php';

$name = $_POST['name'];
$price = $_POST['price'];
$video = $_POST['video'];
$isRecommended = isset($_POST['isRecommended']) ? 1 : 0;

if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
    $image = $_FILES['image']['name'];
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    move_uploaded_file($_FILES["image"]["tmp_name"], $target_file);
} else {
    $image = null;
}

$sql = "INSERT INTO products (name, price, video, image, isRecommended) VALUES ('$name', $price, '$video', '$image', $isRecommended)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('message' => 'Product added successfully'));
} else {
    echo json_encode(array('error' => $conn->error));
}

$conn->close();
?>

