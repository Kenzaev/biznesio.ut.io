<?php
include 'db.php';

$id = $_POST['id'];

$sql = "DELETE FROM products WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('message' => 'Product deleted successfully'));
} else {
    echo json_encode(array('error' => $conn->error));
}

$conn->close();

?>
