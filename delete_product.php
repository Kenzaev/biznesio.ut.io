<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];

    $sql = "DELETE FROM products WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(array('message' => 'Product deleted successfully'));
    } else {
        echo json_encode(array('error' => $stmt->error));
    }

    $stmt->close();
} else {
    echo json_encode(array('error' => 'Invalid request method'));
}

$conn->close();
?>
