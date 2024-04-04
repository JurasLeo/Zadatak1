<?php
session_start();


$servername = "student.veleri.hr";
$username = "abahoric";
$password = "11";
$dbname = "abahoric";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Povezivanje nije uspjelo: " . $conn->connect_error);
}


$proizvod_id = $_POST['proizvod_id'];
$cijena = floatval($_POST['cijena']);
 
$sql = "INSERT INTO kosarica (proizvod_id, kolicina, cijena) VALUES ('$proizvod_id', 1, '$cijena') ON DUPLICATE KEY UPDATE kolicina = kolicina + 1";
$result = $conn->query($sql);


if ($result) {
    header("Location: " . $_SERVER['HTTP_REFERER']);
} 
else {
    echo "Greška pri dodavanju proizvoda u košaricu: " . $conn->error;
}

$conn->close();
?>