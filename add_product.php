<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    error_log('Debug: ' . print_r($_POST, true));
    error_log('Debug: ' . print_r($_FILES, true));

    $name = $_POST['name'];
    $price = $_POST['price'];
    $video = $_POST['video'];
    $isRecommended = isset($_POST['isRecommended']) ? 1 : 0;

    $image = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $image = $_FILES['image']['name'];
        $target_dir = "uploads/";
        if (!file_exists($target_dir)) {
            mkdir($target_dir, 0777, true);
        }
        $target_file = $target_dir . basename($_FILES["image"]["name"]);
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            error_log('Debug: Image uploaded successfully to ' . $target_file);
        } else {
            error_log('Debug: Failed to upload image');
            echo json_encode(array('error' => 'Failed to upload image'));
            exit;
        }
    }

    $sql = "INSERT INTO products (name, price, video, image, isRecommended) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        error_log('Debug: Failed to prepare statement');
        echo json_encode(array('error' => 'Failed to prepare statement'));
        exit;
    }

    $stmt->bind_param("sdisi", $name, $price, $video, $image, $isRecommended);

    if ($stmt->execute()) {
        error_log('Debug: Product added successfully');
        echo json_encode(array('message' => 'Product added successfully'));
    } else {
        error_log('Debug: Failed to execute statement: ' . $stmt->error);
        echo json_encode(array('error' => $stmt->error));
    }

    $stmt->close();
} else {
    echo json_encode(array('error' => 'Invalid request method'));
}

$conn->close();
?>
