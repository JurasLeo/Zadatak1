<?php
$server = "student.veleri.hr";
$database = "abahoric";
$username = "abahoric";
$password = "11";

$conn = mysqli_connect($server, $username, $password, $database) or die("Konekcija nije uspješna");

$iznos = isset($_POST["iznos"]) ? $_POST["iznos"] : '';
$nadimak = isset($_POST["nadimak"]) ? $_POST["nadimak"] : '';

// Prepare and bind the statement
$query = $conn->prepare("INSERT INTO donacija (donacija, nadimak) VALUES (?, ?)");
$query->bind_param("ss", $iznos, $nadimak);

// Execute the statement
$res = $query->execute();

// Check the result
if ($res) {
    echo "Donacija je uspješna!";
} else {
    echo "Došlo je do problema prilikom slanja donacije: " . $query->error;
}

// Close the statement and connection
$query->close();
mysqli_close($conn);
?>
